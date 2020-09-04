var router = require('express').Router();
var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');
var seeder = require('mongoose-seeder');

router.use('/seed', require('./seed'))

Restaurant.restaurantSeed()

module.exports = router;