const router = require('express').Router();
const Favourites = require("mongoose").model("Favourites")

router.get('/', (req, res) => {
    Favourites.find().then(fav => {
        return res.json({success: true, data: fav})
    })
});

module.exports = router