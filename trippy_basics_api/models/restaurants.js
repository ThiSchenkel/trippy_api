const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: Number,
    cuisine: String,
    priceCategory: Number
});
const restaurantModel = mongoose.model('restaurants', restaurantSchema);
module.exports = restaurantModel;