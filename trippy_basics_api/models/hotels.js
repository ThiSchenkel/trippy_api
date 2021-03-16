const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    stars: Number,
    hasSpa: Boolean,
    hasPool: Boolean,
    priceCategory: Number
});
const hotelModel = mongoose.model("hotels", hotelSchema);
module.exports = hotelModel;