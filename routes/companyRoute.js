var express = require('express')
var controller = require('../components/company')
var apiAuthentication = require('../helper/apiAuthentication')

var router = express.Router();

router.post('/create', controller.companyReg)
router.post('/login', controller.companyLogin)
router.delete('/delete/:companyName',apiAuthentication.validateToken, controller.deleteCompany);
router.put('/edit/:companyName', apiAuthentication.validateToken, controller.editCompany);

module.exports = router