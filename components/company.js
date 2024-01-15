const model = require('../model/schema');
const bcrypt = require('bcryptjs');
const validator = require('../helper/validation');
const logger = require('../helper/logger');
const mongoose = require('mongoose');
const apiAuth = require('../helper/apiAuthentication');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

/*
Company Registration Function
API: POST /company/create
Accepts: companyName, companyEmail, password, companyAddress, companyPhone, gstNumber, password
*/
exports.companyReg = async (req, res) => {
    try {
        // Check if the email already exists in the database
        const existingCompany = await model.Company.findOne({
            companyName: req.body.companyName
        });

        if (existingCompany) {
            const err = new Error('The Company already exist!');
            err.status = 400;
            throw err;
        } else {
            // Create a new Company instance with the request body data
            const newCompany = new model.Company({
                _id: new mongoose.Types.ObjectId(), // Generate a unique ID
                ...req.body,
            });

            // Validate company data
            if (
                validator.emailValidation(newCompany.companyEmail) &&
                validator.passwordValidation(newCompany.password) &&
                validator.notNull(newCompany.companyName) && 
                (newCompany.gstNumber =="" || validator.gstValidation(newCompany.gstNumber))
            ) {
                // Hash the password using bcrypt
                const salt = await bcrypt.genSalt(10);
                newCompany.password = await bcrypt.hash(newCompany.password, salt);

                // Handle logo file upload
                if (req.files && req.files.logo) {
                    const logoFile = req.files.logo;
                    const logoFileName = `${Date.now()}_${logoFile.name}`;

                    // Save the logo file locally
                    logoFile.mv(path.join(__dirname, '../uploads', logoFileName), (err) => {
                        if (err) {
                            throw err;
                        }

                        // Set the logo path in the company model
                        newCompany.logoPath = `uploads/${logoFileName}`;

                    })
                }

                // Save the new company data to the database
                var savedCompany = await model.Company.create(newCompany);

                // Respond with success message and company ID
                res.status(200).json({
                    status: 'Success',
                    message: 'Company Registration Success',
                    companyId: savedCompany.id
                });
            }
        }
    } catch (err) {
        // Log the error and send an appropriate response to the client
        logger.error(`URL : ${req.originalUrl} | status : ${err.status} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message
        });
    }
};

exports.companyLogin = async (req, res) => {
    try {
        const { companyName, password } = req.body;

        // Check if the company exists
        const existingCompany = await model.Company.findOne({ companyName: companyName });
        if (!existingCompany) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, existingCompany.password);
        if (!isPasswordMatch) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }

        // Generate a JWT token for authentication
        const token = apiAuth.generateAccessToken(existingCompany.companyName)

        // Respond with the JWT token
        res.status(200).json({
            status: 'Success',
            message: 'Company login successful',
            token: token,
        });
    } catch (err) {
        // Log the error and send an appropriate response to the client
        logger.error(`URL : ${req.originalUrl} | status : ${err.status} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};


exports.editCompany = async (req, res) => {
    try {
        const companyName = req.params.companyName;
        const updatedCompanyData = req.body; // Updated company data from the request body

        // Check if the company exists
        const existingCompany = await model.Company.findOne({ companyName: companyName });
        if (!existingCompany) {
            const err = new Error('Company not found');
            err.status = 404;
            throw err;
        }

        // Update the company data
        await model.Company.findOneAndUpdate({ companyName: companyName }, updatedCompanyData, { new: true });

        // Respond with success message
        res.status(200).json({
            status: 'Success',
            message: 'Company updated successfully',
        });
    } catch (err) {
        // Log the error and send an appropriate response to the client
        logger.error(`URL : ${req.originalUrl} | status : ${err.status} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message
        });
    }
};


// Assuming that you have a DELETE endpoint at /company/delete/:companyName
exports.deleteCompany = async (req, res) => {
    try {
        const companyName = req.params.companyName;

        // Check if the company exists
        const existingCompany = await model.Company.findOne({ companyName: companyName });
        if (!existingCompany) {
            const err = new Error('Company not found');
            err.status = 404;
            throw err;
        }

        // Delete the company
        await model.Company.findOneAndDelete({ companyName: companyName });

        // Respond with success message
        res.status(200).json({
            status: 'Success',
            message: 'Company deleted successfully',
        });
    } catch (err) {
        // Log the error and send an appropriate response to the client
        logger.error(`URL : ${req.originalUrl} | status : ${err.status} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message
        });
    }
};

// View all companies
exports.viewAllCompanies = async (req, res) => {
    try {
        const companies = await model.Company.find();
        res.status(200).json({
            status: 'Success',
            data: companies
        });
    } catch (err) {
        logger.error(`URL : ${req.originalUrl} | status : ${err.status} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message
        });
    }
};

// View a specific company by ID
exports.viewCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await model.Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'Company not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            data: company
        });
    } catch (err) {
        logger.error(`URL : ${req.originalUrl} | status : ${err.status} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message
        });
    }
};

// View a specific company by name
exports.viewCompanyByName = async (req, res) => {
    try {
        const companyName = req.params.companyName;

        // Assuming the company name is unique, you can find it directly
        const company = await model.Company.findOne({ companyName: companyName });

        if (!company) {
            return res.status(404).json({
                status: 'Not Found',
                message: 'Company not found'
            });
        }

        res.status(200).json({
            status: 'Success',
            data: company
        });
    } catch (err) {
        logger.error(`URL : ${req.originalUrl} | status : ${err.status} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message
        });
    }
};

exports.countCompanies = async (req, res) => {
    try {
        const count = await model.Company.countDocuments();
        res.status(200).json({
            status: 'Success',
            count: count
        });
    } catch (err) {
        logger.error(`URL : ${req.originalUrl} | status : ${err.status} | message: ${err.message}`);
        res.status(err.status || 500).json({
            message: err.message
        });
    }
};