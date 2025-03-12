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


// Temporary OTP storage (use Redis in production)
const otpStorage = new Map();

// Generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;

  // Validate email domain
  const domain = email.split('@')[1];
  const allowedDomains = ['tecvinsonacademy.com', 'tecvinson.com'];
  
  if (!allowedDomains.includes(domain)) {
    return res.status(400).json({ 
      message: 'OTP is only available for Tecvinson email domains' 
    });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP with expiration (10 minutes)
    otpStorage.set(email, {
      otp,
      createdAt: Date.now(),
      expires: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Login OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>One-Time Password (OTP)</h2>
          <p>Your OTP for login is:</p>
          <div style="font-size: 24px; font-weight: bold; color: #007bff;">
            ${otp}
          </div>
          <p>This OTP will expire in 10 minutes.</p>
        </div>
      `
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('OTP sending error:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

// Verify OTP endpoint
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Retrieve stored OTP
    const storedOtpData = otpStorage.get(email);

    // Check if OTP exists and is valid
    if (!storedOtpData) {
      return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
    }

    // Check if OTP has expired
    if (Date.now() > storedOtpData.expires) {
      otpStorage.delete(email);
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Verify OTP
    if (storedOtpData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Find the user
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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

    // Clear the used OTP
    otpStorage.delete(email);

    res.json({
      user: {
        email: user.email,
        role: user.role
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error' });
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
  country: {
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

      

      const { year, cohort, country } = req.body;

      // Validate country
      if (!country) {
        return res.status(400).json({
        message: 'Country is required'
      });
      }

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
          country: req.body.country,
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
      country,
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
    if (country) query.country = country; // Filter by country

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

     // Get all unique countries
     const countries = await Application.distinct('country');

    console.log('Course Titles:', courseTitles);
    console.log('Countries:', countries);

    // Map applications to include the new fields
    const response = {
      applications: applications.map((app) => ({
        id: app._id,
        name: app.fullName,
        email: app.email,
        phone: app.phoneNumber,
        country: app.country || 'Not provided',
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
      countries: countries.filter(Boolean), // Return available countries for filtering
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
  // Updated to array of strings for multi-select
  services: {
      type: [String],
      required: [true, 'At least one service is required.'],
      validate: {
          validator: function(v) {
              return Array.isArray(v) && v.length > 0;
          },
          message: 'Please select at least one service of interest.'
      }
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
const validateContactForm = ({ fullName, email, phone, companyName, services, note }) => {
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

  // Validate services array
  if (!services || !Array.isArray(services) || services.length === 0) {
      errors.services = "Please select at least one service of interest.";
  }

  if (!note || note.trim().length < 10) {
      errors.note = "Note must be at least 10 characters long.";
  }

  return errors;
};

// Handle Contact Form Submission
app.post('/api/contact', async (req, res) => {
  console.log("Incoming request:", req.body); // Log input data
  const { fullName, email, phone, companyName, services, note } = req.body;

  // Validate input
  const errors = validateContactForm({ fullName, email, phone, companyName, services, note });
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
          services: services, // Now storing as an array
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
