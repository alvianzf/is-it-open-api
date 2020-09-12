const mongoose = require('mongoose'); // Erase if already required
const Restaurant = mongoose.model("Restaurant")

// Declare the Schema of the Mongo model
var favouritesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    restaurants:[{type: mongoose.Schema.Types.ObjectId, ref: Restaurant}],
}, {timestamps: true});

//Export the model
module.exports = mongoose.model('Favourites', favouritesSchema);