const mongoose = require("mongoose");
const hotelModel = require("./hotels");
const restaurantModel = require("./restaurants");

mongoose.connect("mongodb://localhost:27017/trippy_api", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("BD trippy_api connecté");
});

//

const createHotel = async () => {
    await hotelModel.deleteMany({})
    await hotelModel.create([
        {
            name: "Nice",
            address: "51 rue de la commune",
            city: "Paris",
            country: "France",
            stars: 3,
            hasSpa: false,
            asPool: false,
            priceCategory: 1,
        },
        {
            name: "Bouya Hotel",
            address: "2 rue près de chez Toi",
            city: "France",
            country: "Paris",
            stars: 4,
            hasSpa: false,
            asPool: false,
            priceCategory: 3,
        }]).then((response) => {
            console.log(response);
        })
}
createHotel();

const createRestaurant = async () => {
    await restaurantModel.deleteMany({})
    await restaurantModel.create([
        {
            name: "Bouya's Restaurant",
            address: "95 Bis boulevard richard lenoir",
            city: "Paris",
            country: "France",
            stars: 5,
            cuisine: "Arabe",
            priceCategory: 3
        },
        {
            name: "Le ThiNem",
            address: "26 rue du Mékong",
            city: "Paris",
            country: "France",
            stars: 5,
            cuisine: "Asiatique",
            priceCategory: 4
        }]).then((response) => {
            console.log(response);
        })
}
createRestaurant();
//
