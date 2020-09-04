var express = require('express');
var router = express.Router();
var Restaurant = require('mongoose').model('Restaurant')

router.get("/", (req, res) => {
    var query = {};
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
            count
        })

    }).catch(err => console.log(err))
})

module.exports = router