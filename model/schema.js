const mongoose = require('mongoose');
const logger = require('../helper/logger');

// Establish database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        logger.info('DB Connection Established');
        console.log("DB Connected");
    })
    .catch(err => {
        logger.error(`DB Connection Fail | ${err.stack}`);
        console.log(err);
    });

// Define Mongoose schema for Company
const Company = new mongoose.Schema({
    // MongoDB will generate a unique ID
    _id: mongoose.Schema.Types.ObjectId,
    // Company Name
    companyName: {
        type: String,
        required: true, // Company name is required
        maxlength: 25, // Maximum length of 25 characters for the company name
    },

    // Company Password
    password: {
        type: String,
        required: true,
    },

    // Company Address
    companyAddress: {
        type: String,
        required: true, // Company address is required
        maxlength: 50, // Maximum length of 50 characters for the company name
    },

    // Company Email
    companyEmail: {
        type: String,
        required: true, // Company email is required
        unique: true, // Ensure uniqueness across companies
        lowercase: true, // Convert email to lowercase for consistency
        trim: true, // Trim leading and trailing whitespaces
        match: /^\S+@\S+\.\S+$/, // Regular expression for basic email validation
    },

    // Company Phone Number
    companyPhone: {
        type: String,
        match: /^\d{10}$/ // Regular expression for a 10-digit phone number
    },

    // Company Logo
    logoPath: {
        type: String, // Store the file path of the logo
    },

    // Goods and Services Tax (GST) Number
    gstNumber: {
        type: String,
        validate: {
            validator: function (value) {
                // Allow null or empty string
                if (value === null || value.trim() === "") {
                    return true;
                }

                // Use a regular expression to validate GST number format
                // Example GST format: 29ABCDE1234F1Z5
                const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
                return gstRegex.test(value);
            },
            message: 'Invalid GST number format',
        },
    },
});

// Create and export the Company model
module.exports.Company = mongoose.model('company', Company);