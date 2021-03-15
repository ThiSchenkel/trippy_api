const mongoose = require('mongoose');
const express = require("express")
const app = express();
const port = 8000;
mongoose.connect("mongodb://localhost:27017/trippy_api", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("BD trippy_api connecté");

    const restaurantModel = require("./models/restaurants");
    const hotelModel = require("./models/hotels");
    const { request } = require('express');
    const bodyParser = require('body-parser');

    app.use(bodyParser.urlencoded({ extendes: false }));
    app.use(bodyParser.json());


});

app.listen(port, () => {
    console.log("Server trippy_api ok")
})

app.get('/restaurants', (req, res) => {
    res.send("bouya les restaurants")
})

//Créer la route /hotels qui retournera tous les hôtels (GET /hotels)
app.get("/hotels", async (req, res) => {
    const hotels = await hotelModel.find(); res.json(hotels);
});

// Créer la route /hotels/:id où l’ID correspondra à l’Object Id dans la base de données (GET /hotels/:id)
app.get("/hotels/:id", async (req, res) => {
    const hotel = await hotelModel.find({ _id: req.params.id }).lean().exec();
    res.json(hotel);
});

// Ajouter la possibilité de créer un nouvel hôtel (POST /hotels)
app.post('/hotels', (req, res) => {
    const hotel = new hotelModel({
        ...req.body
    });
    hotel.save()
        .then(() => res.status(201).json({ message: 'Nouvel Hotel enregistré!' }))
        .catch(error => res.status(400).json({ error }));
});


// Ajouter la possiblité de mettre à jour le nom d’un hôtel (PUT /hotels/:id?name=newName) ==> A REVOIR
app.put('/hotels/:id?name=newName', (req, res) => {
    const hotel = new hotelModel({
        ...req.body
    });
    hotel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Nom Hotel modifié!' }))
        .catch(error => res.status(400).json({ error }));
});

// Ajouter la possiblité d’effacer un hôtel (`DELETE /hotels/:id`)
// app.delete('/hotels/:id', (req, res) => {
//     const hotel = await hotelModel.deleteOne({ _id: req.params.id })

//     res.json(hotel);

// })





