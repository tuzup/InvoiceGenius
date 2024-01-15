const model = require('../model/schema');
const bcrypt = require('bcryptjs');
const validator = require('../helper/validation');
const logger = require('../helper/logger');
const mongoose = require('mongoose');
const apiAuth = require('../helper/apiAuthentication');
const fs = require('fs');
const path = require('path');

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