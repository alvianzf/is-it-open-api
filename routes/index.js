var router = require('express').Router()

router.use('/api', require('./api'))

router.get('/', function(req, res){
    return res.status(422).json({success: true, message: "Nothing to see here"})
  });


  module.exports = router;