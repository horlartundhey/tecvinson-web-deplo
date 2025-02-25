require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { generateCohorts } = require('./utils/cohortUtils');

// const router = express.Router();


const app = express();
app.use(cors(
    { 
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use(express.json());

app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
    // app.options('*', cors(corsOptions));


    // Middleware to verify JWT
  const verifyToken = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      
      if (!token) {
        return res.status(401).json({ 
          success: false,
          message: 'Access denied. No token provided' 
        });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

// Verify session endpoint
app.get('/api/verify-session', verifyToken, (req, res) => {
    res.json({ 
      user: req.user,
      message: 'Session is valid' 
    });
});

// Define the User Schema (for login)
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    uniqueCode: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superAdmin'],
      default: 'user'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date
    }
  });
  
  const loginTokenSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600 // Token expires after 1 hour
    }
  });
  
  const User = mongoose.model('User', userSchema);
  const LoginToken = mongoose.model('LoginToken', loginTokenSchema);
  

// Configure your email transport
const transporter = nodemailer.createTransport({
  // Configure with your email service
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Login initiation endpoint
app.post('/api/initiate', async (req, res) => {
    const { email, uniqueCode } = req.body;
  
    try {
      // Add rate limiting for security
    // const attempts = await LoginAttempt.countDocuments({
    //   email,
    //   createdAt: { $gt: new Date(Date.now() - 15 * 60 * 1000) } // 15 minutes
    // });

    // if (attempts > 5) {
    //   return res.status(429).json({ 
    //     message: 'Too many login attempts. Please try again later.' 
    //   });
    // }

      const user = await User.findOne({ email, uniqueCode });
    
    // Record the attempt
    // await LoginAttempt.create({ email });
    
    if (!user || !user.isActive) {
      // Use the same response for security
      return res.json({ 
        message: 'If your email and code are valid, you will receive a login link shortly.' 
      });
    }

    // Generate a secure token
    const loginToken = crypto.randomBytes(32).toString('hex');
    
    // Save token with user reference and short expiration
    await LoginToken.create({
      email: user.email,
      token: loginToken,
      userId: user._id // Add user reference
    });

    // Create a client-side route (not API route)
    const loginLink = `${process.env.CLIENT_URL}/verify-login/${loginToken}`;

    // Send email with improved template
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your Secure Login Link',
      html: `
        <div style="padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2>Secure Login Link</h2>
          <p>A login was requested for your account. Click the button below to log in:</p>
          <div style="margin: 25px 0;">
            <a href="${loginLink}" 
               style="background: #007bff; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px;">
              Login to your account
            </a>
          </div>
          <p><strong>This link will expire in 1 hour for security.</strong></p>
          <p>If you didn't request this login, please ignore this email.</p>
        </div>
      `
    });

    res.json({ 
      message: 'If your email and code are valid, you will receive a login link shortly.' 
    });
  } catch (error) {
    console.error('Login initiation error:', error);
    res.status(500).json({ 
      message: 'An error occurred. Please try again later.' 
    });
  }
  });

  // Verify login token and complete login
  app.get('/api/verify/:token', async (req, res) => {
    const { token } = req.params;
  
    try {
      const loginToken = await LoginToken.findOneAndDelete({ 
        token,
        createdAt: { $gt: new Date(Date.now() - 3600000) } // Verify token age
      });
      
      if (!loginToken) {
        return res.status(400).json({ message: 'Invalid or expired login link.' });
      }
  
      const user = await User.findOne({ email: loginToken.email });
      
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }
  
      // Update last login
      user.lastLogin = new Date();
      await user.save();
  
      // Generate JWT
      const jwt_token = jwt.sign(
        { 
          userId: user._id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      // Set JWT as HttpOnly cookie
      res.cookie('jwt', jwt_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
  
      res.json({
        user: {
          email: user.email,
          role: user.role
        },
        message: 'Login successful'
      });
    } catch (error) {
      console.error('Login verification error:', error);
      res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
  });
  
  // Logout endpoint
  app.post('/api/logout', (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'Logged out successfully' });
  });

  // Script to add test users
async function createTestUsers() {
    try {
      const testUsers = [
        {
          email: 'hybridtradersfx@gmail.com',
          uniqueCode: 'ADMIN123',
          role: 'admin'
        },
        {
          email: 'user@example.com',
          uniqueCode: 'USER456',
          role: 'user'
        },
        {
          email: 'super@example.com',
          uniqueCode: 'SUPER789',
          role: 'superAdmin'
        }
      ];
  
      for (const user of testUsers) {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create(user);
          console.log(`Created test user: ${user.email}`);
        }
      }
  
      console.log('Test users created successfully');
    } catch (error) {
      console.error('Error creating test users:', error);
    }
  }

  // Uncomment to create test users
//createTestUsers();
  

// Define the Application Schema
const applicationSchema = new mongoose.Schema({
  fullName: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  phoneNumber: {
      type: String,
      required: true
  },
  year: { type: String, required: true },
  cohort: {
    id: String,
    name: String,
    dateRange: String,
    fullName: String
  },
  currentExperienceLevel: String,
  timezone: String,
  reasonForInterest: String,
  courseTitle: {
      type: String,
      required: true
  },
  category: {
      type: String,
      required: true,      
  },
  courseCost: {
      type: Number,
      required: true
  },
  paymentStatus: {
      type: String,
      enum: ['Pending', 'Failed', 'Successful'],
      default: 'Pending'
  },
  applicationDate: {
      type: Date,
      default: Date.now
  },
  stripeSessionId: String
});

const Application = mongoose.model('Application', applicationSchema);

app.post('/api/save-application', async (req, res) => {
  try {
      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
              {
                  price_data: {
                      currency: 'usd',
                      product_data: { name: req.body.courseTitle },                      
                      unit_amount: req.body.courseCost * 100, // Amount in cents
                  },
                  quantity: 1,
              },
          ],
          mode: 'payment',
          success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });

      console.log('Received application data:', req.body);

      const { year, cohort } = req.body;

      const cohorts = generateCohorts(parseInt(req.body.year));
      const selectedCohort = cohorts.find(c => c.id === req.body.cohort.id);
      
      if (!selectedCohort || selectedCohort.isDisabled) {
      console.log('Invalid cohort selected:', cohort);
      return res.status(400).json({
        message: 'Selected cohort is not available'
      });
    }
      
      // Save application with all necessary fields
      const application = new Application({
          fullName: req.body.fullName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          currentExperienceLevel: req.body.currentExperienceLevel,
          timezone: req.body.timezone,
          year: req.body.year,          
          reasonForInterest: req.body.reasonForInterest,
          courseTitle: req.body.courseTitle,
          category: req.body.category,
          courseCost: req.body.courseCost,
          paymentStatus: 'Pending', // Default status before payment completion
          cohort: {
            id: req.body.cohort.id,
            name: req.body.cohort.name,
            dateRange: req.body.cohort.dateRange,
            fullName: req.body.cohort.fullName
          },
          stripeSessionId: session.id,
          applicationDate: new Date(),
      });

      await application.save();

      res.json({ url: session.url });
  } catch (error) {
      console.error('Error saving application:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// First, set up the webhook endpoint
app.post('/api/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Update the application in database
      await Application.findOneAndUpdate(
        { stripeSessionId: session.id },
        { 
          paymentStatus: 'Successful',
          paymentDate: new Date()
        }
      );
    }

    res.json({received: true});
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});


// Get applications with filters endpoint
app.get('/api/applications', async (req, res) => {
  try {
    const {
      category,
      search,
      dateFrom,
      dateTo,
      year,
      cohort,
      subcategory, // Add subcategory filter
      page = 1,
      limit = 10,
    } = req.query;

    console.log('Received Query Parameters:', req.query);

    // Build query
    const query = {};

    // Apply category filter (exact match)
    if (category && category !== 'All') {
      query.category = category; // Exact match instead of regex
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }

    if (year) query.year = year;
    if (cohort) query['cohort.name'] = cohort; // Filter by cohort name

    if (subcategory && subcategory !== 'All Subcategories') {
      query.courseTitle = subcategory; // Exact match for course title
    }

    if (dateFrom || dateTo) {
      query.applicationDate = {};
      if (dateFrom) query.applicationDate.$gte = new Date(dateFrom);
      if (dateTo) query.applicationDate.$lte = new Date(dateTo);
    }

    console.log('MongoDB Query:', query);

    // Execute query with pagination
    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      Application.find(query)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ applicationDate: -1 }),
      Application.countDocuments(query),
    ]);

    console.log('Found Applications Count:', applications.length);

    // Get all unique course titles for the category
    let courseTitles = [];
    if (category && category !== 'All') {
      courseTitles = await Application.distinct('courseTitle', { category });
    } else {
      courseTitles = await Application.distinct('courseTitle');
    }

    console.log('Course Titles:', courseTitles);

    // Map applications to include the new fields
    const response = {
      applications: applications.map((app) => ({
        id: app._id,
        name: app.fullName,
        email: app.email,
        phone: app.phoneNumber,
        currentExperienceLevel: app.currentExperienceLevel || 'Not provided',
        reasonForInterest: app.reasonForInterest || 'No reason provided',
        course: app.courseTitle,
        category: app.category,
        year: app.year,
        cohort: app.cohort || null,
        courseCost: app.courseCost,
        paymentStatus: app.paymentStatus,
        dateApplied: app.applicationDate,
        status: app.paymentStatus,
      })),
      courseTitles: courseTitles.filter(Boolean),
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total,
    };

    console.log('Final Response:', response);

    res.json(response);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




// Define the Subscription Schema
const subscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

// Save application data
// app.post('/api/save-application', async (req, res) => {
//     try {
//         const application = new Application(req.body);
//         await application.save();

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [{
//                 price_data: {
//                     currency: 'usd',
//                     product_data: { name: req.body.courseTitle },
//                     unit_amount: req.body.courseCost * 100, // Amount in cents
//                 },
//                 quantity: 1
//             }],
//             mode: 'payment',
//             success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: `${process.env.CLIENT_URL}/cancel`
//         });

//         res.json({ url: session.url });
//     } catch (error) {
//         console.error("Error saving application:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// Handle new subscriptions
app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;

    // Server-side email validation
    if (!email || !/.+@.+\..+/.test(email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
    }

    try {
        // Check if the email already exists
        const existingSubscription = await Subscription.findOne({ email });
        if (existingSubscription) {
            return res.status(400).json({ message: "Email is already subscribed." });
        }

        // Save the new subscription
        const subscription = new Subscription({ email });
        await subscription.save();

        res.status(200).json({ message: "Subscription successful!" });
    } catch (error) {
        console.error("Error subscribing:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Define the Contact Schema
const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        match: [/.+@.+\..+/, 'Please enter a valid email address.']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.'],
        match: [/^\+?(\d{1,4}[-\s]?)?(\(?\d{1,4}\)?[-\s]?)?[\d\s-]{7,15}$/, 'Please enter a valid phone number.']
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required.']
    },
    service: {
        type: String,
        required: [true, 'Service is required.']
    },
    note: {
        type: String,
        required: [true, 'Note is required.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle Contact Form Submission
// Centralized validation logic for contact form
const validateContactForm = ({ fullName, email, phone, companyName, service, note }) => {
    const errors = {};

    if (!fullName || fullName.trim() === '') {
        errors.fullName = "Full name is required.";
    }

    if (!email || email.trim() === '' || !/.+@.+\..+/.test(email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!phone || phone.trim() === '' || !/^\+?(\d{1,4}[-\s]?)?(\(?\d{1,4}\)?[-\s]?)?[\d\s-]{7,15}$/.test(phone)) {
        errors.phone = "Please enter a valid phone number.";
    }

    if (!companyName || companyName.trim() === '') {
        errors.companyName = "Company name is required.";
    }

    if (!service || service.trim() === '') {
        errors.service = "Service is required.";
    }

    if (!note || note.trim().length < 10) {
        errors.note = "Note must be at least 10 characters long.";
    }

    return errors;
};

// Handle Contact Form Submission
app.post('/api/contact', async (req, res) => {
    console.log("Incoming request:", req.body); // Log input data
    const { fullName, email, phone, companyName, service, note } = req.body;

    // Validate input
    const errors = validateContactForm({ fullName, email, phone, companyName, service, note });
    if (Object.keys(errors).length > 0) {
        console.log("Validation errors:", errors);
        return res.status(400).json({
            message: "Validation failed. Please correct the errors below.",
            errors
        });
    }

    try {
        const contact = new Contact({
            fullName: fullName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            companyName: companyName.trim(),
            service: service.trim(),
            note: note.trim()
        });
        await contact.save();

        res.status(200).json({ message: "Your message has been sent successfully." });
    } catch (error) {
        console.error("Error saving contact form:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error.", errors: error.errors });
        }
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});




// Start the server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
