var express = require('express')
var controller = require('../components/company')

var router = express.Router();

router.post('/create', controller.companyReg)

module.exports = router