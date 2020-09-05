const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var favouritesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    list:{
        type:Array,
    },
}, {timestamps: true});

//Export the model
module.exports = mongoose.model('Favourites', favouritesSchema);