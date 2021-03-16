const mongoose = require("mongoose");
const hotelModel = require("./hotels");
const restaurantModel = require("./restaurants");

mongoose.connect("mongodb://localhost:27017/trippy_api", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("BD trippy_api connecté");
});

//

const createHotel = async () => {
    await hotelModel.deleteMany({}).exec(); // {} => filtre pour tout supprimer
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
        },
        {
            name: "Hotel AntiBalle",
            address: "2 rue des Baskets",
            city: "Evreux",
            country: "France",
            stars: 1,
            hasSpa: false,
            asPool: false,
            priceCategory: 2,
        },
        {
            name: "Le Grecqouille",
            address: "87 rue des Gaipieds",
            city: "Paris",
            country: "Saint-Maur",
            stars: 5,
            hasSpa: false,
            asPool: false,
            priceCategory: 3,
        }]).then((response) => {
            console.log(response);
        })
}
createHotel();

const createRestaurant = async () => {
    await restaurantModel.deleteMany({}).exec();
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
            priceCategory: 1
        },
        {
            name: "Signature",
            address: "2 rue des Abesses",
            city: "Paris",
            country: "France",
            stars: 4,
            cuisine: "Fusion franco-coréen",
            priceCategory: 3
        },
        {
            name: "Konexio FastFood",
            address: "15 rue de la Réunion",
            city: "Paris",
            country: "France",
            stars: 2,
            cuisine: "Pas ouf",
            priceCategory: 3
        }
    ]).then((response) => {
        console.log(response);
    })
}
createRestaurant();
//
