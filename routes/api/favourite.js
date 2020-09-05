const router = require('express').Router();
const Favourites = require("mongoose").model("Favourites")


// Get all favourite Restaurants
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
            Favourites.find()
                .limit(Number(limit))
                .skip(Number(offset))
                .exec(),
            Favourites.count().exec()
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


// Search for Favourites by name
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
            Favourites.find({name: {$regex: '.*' + name + '.*'} })
                .limit(Number(limit))
                .skip(Number(offset))
                .exec(),
            Favourites.find({name: {$regex: '.*' + name + '.*'} }).count().exec()
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


// get single Favourites by id
router.get("/:id", (req, res) => {
    const _id = req.params.id
    Promise.all(
        [
            Favourites.find({_id })
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


// Post a new restaurant Favourites
router.post("/", (req, res) => {
    var favourites = new Favourites(req.body)

    return favourites.save()
        .then((err) => {
            if(err) return res.json({success: false, message: "Save failed", err: err.message})
            return res.json({success: true, message: "List saved", data: favourites})
        })
})


// Updates list
router.put("/:id", (req, res) => {

    Favourites.findByIdAndUpdate(req.params.id, req.body).exec()
            .then((err) => {
                if (err) return res.json({success: false, message: "Update failed", err: err.message})
                return res.json({success: true, message: "List Updated", data: req.body})
            })
})

// Deletes a favourites
router.delete("/:id", (req, res) => {
    Favourites.findByIdAndRemove(req.params.id).exec()
            .then((err) => {
                if (err) return res.json({success: false, message: "Delete failed", err: err.message})
                return res.status(204).json({success: true, message: "Favourites Deleted", data: deleted})
            })
})

module.exports = router