var express = require('express')
var controller = require('../components/company')
var apiAuthentication = require('../helper/apiAuthentication')

var router = express.Router();

router.post('/create', controller.companyReg)
router.post('/login', controller.companyLogin)
router.delete('/delete/:companyName',apiAuthentication.validateToken, controller.deleteCompany);
router.put('/edit/:companyName', apiAuthentication.validateToken, controller.editCompany);
router.get('/viewID/:id', apiAuthentication.validateToken, controller.viewCompanyById);
router.get('/viewAll', apiAuthentication.validateToken, controller.viewAllCompanies);
router.get('/view/:companyName',apiAuthentication.validateToken, controller.viewCompanyByName);
router.get('/count', controller.countCompanies)

module.exports = router