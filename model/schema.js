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
const companySchema = new mongoose.Schema({
    // MongoDB will generate a unique ID
    _id: mongoose.Schema.Types.ObjectId,
    // Company Name
    companyName: {
        type: String,
        unique: true,
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

// Define the schema for the Customer model
const customerSchema = new mongoose.Schema({
  // Customer Name field
  customerName: {
    type: String,
    required: true, // Name is required
    trim: true // Remove leading and trailing whitespaces
  },

  // Customer Address field
  customerAddress: {
    type: String,
    required: true, // Address is required
    trim: true // Remove leading and trailing whitespaces
  },

  // Customer EmailID field
  customerEmailID: {
    type: String,
    required: true, // Email ID is required
    unique: true, // Email ID must be unique
    trim: true, // Remove leading and trailing whitespaces
    lowercase: true, // Store email addresses in lowercase
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ // Basic email format validation
  },

  // Customer Phone Number field
  customerPhoneNumber: {
    type: String,
    required: true, // Phone number is required
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Custom validation for a 10-digit phone number
      },
      message: props => `${props.value} is not a valid phone number!` // Error message for invalid phone number
    }
  },

  // Customer GST Number field
  customerGSTNumber: {
    type: String,
    validate: {
      validator: function (v) {
        // Add your GST number validation logic here if needed
        return true; // Example: Custom validation logic
      },
      message: props => `${props.value} is not a valid GST number!` // Error message for invalid GST number
    }
  },

  // Customer Contact Person field
  customerContactPerson: {
    type: String,
    trim: true // Remove leading and trailing whitespaces
  }
});


// Define Mongoose schema for Company
const cameraSchema = new mongoose.Schema({
  cameraName: {
    type: String,
    required: [true, 'Camera name is required'],
    trim: true,
  },
  cameraPrice: {
    type: Number,
    required: [true, 'Camera price is required'],
    min: [0, 'Camera price cannot be negative'],
  },
  cameraID: {
    type: String,
    required: [true, 'Camera ID is required'],
    unique: true,
    trim: true,
  },
  cameraCategory: {
    type: String,
    enum: ['Bullet', 'Dome'],
    required: [true, 'Camera category is required'],
  },
});

//Create and export Camera model using the schema 
module.exports.Camera = mongoose.model('Camera', cameraSchema)
// Create and export the Customer model using the schema
module.exports.Customer = mongoose.model('Customer', customerSchema);
// Create and export the Company model
module.exports.Company = mongoose.model('Company', companySchema);