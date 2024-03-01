var express = require('express')
var controller = require('../components/camera')
var apiAuthentication = require('../helper/apiAuthentication')

var router = express.Router();

router.post('/create', apiAuthentication.validateToken, controller.addCamera)
router.put('/edit', apiAuthentication.validateToken, controller.editCamera)
router.delete('/delete/:cameraId', apiAuthentication.validateToken, controller.deleteCamera)
router.post('/view', apiAuthentication.validateToken, controller.viewCamera)

module.exports = router 