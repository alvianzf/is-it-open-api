const mongoose = require("mongoose")
const seeder = require("mongoose-seeder")
var axios = require("axios")

const RestaurantSchema =  new mongoose.Schema({
    _id : { type: Number, unique: true, required: true},
    name: { type: String, required: true},
    time: { type: Array, required: true},
}, {timestamps: true})


// Seeds the data to db
RestaurantSchema.statics.restaurantSeed = function() {
    let restaurants = this

    restaurants.find({"_id":0}).then(res => {
        if (!res.length > 0) {
            axios.get("http://localhost:3000/seed").then(data=> {
                restaurants.insertMany(data.data).then(docs=> {
                    console.log(docs)
                }).catch(err => console.log(err))
            })
        }
    })
}

mongoose.model("Restaurant", RestaurantSchema)