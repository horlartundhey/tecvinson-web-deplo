require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors(
    { 
        origin: process.env.CLIENT_URL 
    }
));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
    // app.options('*', cors(corsOptions));


// Define the Application Schema
const applicationSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    currentExperienceLevel: String,
    timezone: String,
    reasonForInterest: String,
    courseTitle: String,
    courseCost: Number,
    paymentStatus: { type: String, default: 'Pending' }
});

const Application = mongoose.model('Application', applicationSchema);

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
app.post('/api/save-application', async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: req.body.courseTitle },
                    unit_amount: req.body.courseCost * 100, // Amount in cents
                },
                quantity: 1
            }],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error saving application:", error);
        res.status(500).json({ message: "Server error" });
    }
});

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

// Start the server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
