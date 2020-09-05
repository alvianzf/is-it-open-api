var express = require('express');
var router = express.Router();
var Restaurant = require('mongoose').model('Restaurant')


// Get all restaurants
router.get("/", (req, res) => {
    var limit = 20;
    var offset = 0;

    if (typeof req.query.limit !== undefined) {
        limit = req.query.limit
    }

    if (typeof req.query.offset !== 'undefined'){
        offset = req.query.offset;
    }

    Promise.all(
        [
            Restaurant.find()
                .limit(Number(limit))
                .skip(Number(offset))
                .exec(),
            Restaurant.count().exec()
        ])
    .then(results => {
        const data = results[0]
        const count = results[1]

        return res.json({
            message: "success",
            data,
            count,
            data_shown: Number(limit),
            offset: Number(offset)
        })

    }).catch(err => console.log(err))
})



// Search for restaurants by name
router.get("/name/:name", (req, res) => {
    var name = req.params.name
    var limit = 20;
    var offset = 0;

    if (typeof req.query.limit !== undefined) {
        limit = req.query.limit
    }

    if (typeof req.query.offset !== 'undefined'){
        offset = req.query.offset;
    }

    Promise.all(
        [
            Restaurant.find({name: {$regex: '.*' + name + '.*'} })
                .limit(Number(limit))
                .skip(Number(offset))
                .exec(),
            Restaurant.find({name: {$regex: '.*' + name + '.*'} }).count().exec()
        ])
    .then(results => {
        const data = results[0]
        const count = results[1]

        return res.json({
            message: "success",
            data,
            count,
            data_shown: Number(limit),
            offset: Number(offset)
        })

    }).catch(err => console.log(err))
})


// get single restaurant by id
router.get("/:id", (req, res) => {
    const _id = req.params.id
    Promise.all(
        [
            Restaurant.find({_id })
                .exec(),
        ])
    .then(results => {
        const data = results[0]
        const count = 1

        return res.json({
            message: "success",
            data,
            count,
        })

    }).catch(err => console.log(err))
})


module.exports = router