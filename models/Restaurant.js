const mongoose = require("mongoose")
var axios = require("axios")
const production  = 'https://be-todo.herokuapp.com/';
const development = 'http://localhost:3001/';
const env = (process.env.NODE_ENV ? production : development);

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