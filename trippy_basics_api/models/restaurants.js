const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: { type: Number, min: [1, 'Pas assez étoiles'], max: 5 },
    cuisine: String,
    priceCategory: { type: Number, min: 1, max: 3 }
});
const restaurantModel = mongoose.model('restaurants', restaurantSchema);
module.exports = restaurantModel;