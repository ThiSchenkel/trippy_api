const mongoose = require('mongoose');
const express = require("express")
const app = express();
const port = 8000;

const restaurantModel = require("./models/restaurants");
const hotelModel = require("./models/hotels");
const { request } = require('express');
// const bodyParser = require('body-parser');
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/trippy_api", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("BD trippy_api connecté");
});

app.listen(port, () => {
    console.log("Server trippy_api ok")
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
    hotel.updateOne({ _id: req.query.id }, { ...req.body, _id: req.query.name })
        .then(() => res.status(200).json({ message: 'Nom Hotel modifié!' }))
        .catch(error => res.status(400).json({ error }));
});

// Ajouter la possiblité d’effacer un hôtel (`DELETE /hotels/:id`)
app.delete("/hotels/:id", async (req, res) => {
    await hotelModel.deleteOne({ _id: req.params.id });
    res.send(`hotel kaput`);
});





//Créer la route `/restaurants` qui retournera tous les restaurants (`GET /restaurants`)
app.get('/restaurants', async (req, res) => {
    const restaurant = await restaurantModel.find(); res.json(restaurant);
});

// Créer la route /restaurants/:id où l’ID correspondra à l’Object Id dans la base de données (GET /restaurants/:id)
app.get('/restaurants/:id', async (req, res) => {
    const restaurant = await restaurantModel.find({ _id: req.params.id }).lean().exec(); res.json(restaurant);
});

// Ajouter la possibilité de créer un nouveau restaurant (POST /restaurants)
app.post('/restaurants', (req, res) => {
    const restaurant = new restaurantModel({
        ...req.body
    });
    restaurant.save()
        .then(() => res.status(201).json({ message: 'Nouvel restaurant enregistré!' }))
        .catch(error => res.status(400).json({ error }));
});

// Ajouter la possiblité de mettre à jour le nom d’un restaurant (`PUT /restaurants?name=newName`)




// Ajouter la possiblité d’effacer un restaurant (`DELETE /restaurants/:id`)
app.delete("/restaurants/:id", async (req, res) => {
    await restaurantModel.deleteOne({ _id: req.params.id });
    res.send(`restaurant kaput`);
});




