var express = require('express');
var router = express.Router();

/* GET health check
API : /api/health
. */
router.get('/', function(req, res, next) {
  res.send('Application up and running');
});

module.exports = router;
