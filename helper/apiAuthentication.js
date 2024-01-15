var jwt = require('jsonwebtoken')
var logger = require('./logger')

exports.generateAccessToken = (company) => {
    return jwt.sign(company, process.env.ACCESS_TOKEN_SECRET)
}


exports.validateToken = (req, res, next) => {
    // Bypass Authentication when DISABLE_API_AUTH is set in the env file for dev purpose only
    if (process.env.DISABLE_API_AUTH === "true") {
        next();
    } else {
        // Checking if authorization is present in the header; if not present, access is forbidden
        if (!req.headers["authorization"]) {
            logger.error(`URL: ${req.originalUrl} | API Authentication Fail | message: Token not present`);
            return res.status(403).json({
                message: "Token not present"
            });
        }

        // Getting token from request header
        const authHeader = req.headers["authorization"];
        // The request header contains the token "Bearer <token>", split the string and use the second value in the split array.
        const token = authHeader.split(" ")[1];

        // Function to verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
            if (err) {
                logger.error(`URL: ${req.originalUrl} | API Authentication Fail | message: Invalid Token`);
                return res.status(403).json({
                    message: "Invalid Token"
                });
            }
            // Proceed to the next action in the calling function
            next();
        });
    }
};

//Validation function to check if the user is same as the token user 
exports.validateUser = (user, emailId) => {
    if (process.env.DISABLE_API_AUTH != "true" &&
        user != emailId
    ) {
        var err = new Error("Access Denied")
        err.status = 403
        throw err
    } else
        return true
}