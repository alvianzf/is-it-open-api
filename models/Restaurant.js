const mongoose = require("mongoose")
const seeder = require("mongoose-seeder")
var axios = require("axios")
var parseDay = require("../utils/parseDay")
var request = require("request");
const production  = 'http://';
const development = 'http://localhost:3001/';
const env = (process.env.NODE_ENV ? production : development);

const url = "https://gist.githubusercontent.com/seahyc/7ee4da8a3fb75a13739bdf5549172b1f/raw/f1c3084250b1cb263198e433ae36ba8d7a0d9ea9/hours.csv"


const RestaurantSchema =  new mongoose.Schema({
    name: { type: String, required: true},
    time: { type: Array, required: true},
}, {timestamps: true})


// Seeds the data to db
RestaurantSchema.statics.restaurantSeed = function() {
    let restaurants = this

    restaurants.find().then(res => {
        if (!res.length > 0) {
            axios.get(env+"api/seed/restaurant").then(data=> {
                restaurants.insertMany(data.data.data).then(docs=> {
                    console.log(docs)
                }).catch(err => console.log(err))
            }).catch(error=> console.log(error))
        }
    })
}

mongoose.model("Restaurant", RestaurantSchema)