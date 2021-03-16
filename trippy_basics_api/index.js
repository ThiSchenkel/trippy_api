const mongoose = require('mongoose');
const express = require("express")
const app = express();
const port = 8000;

const restaurantModel = require("./models/restaurants");
const hotelModel = require("./models/hotels");
const { request } = require('express');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/trippy_api", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("BD trippy_api connecté");
});

app.listen(port, () => {
    console.log("Server trippy_api ok")
})


// --------------------HOTELS----------------------------
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

// Ajouter la possiblité de mettre à jour le nom d’un hôtel (PUT /hotels/:id?name=newName)
app.put('/hotels/:id', (req, res) => {
    console.log(req.query)
    const hotel = hotelModel.updateOne({ _id: req.params.id }, { name: req.query.name })
        .then(() => res.status(200).json({ message: 'Nom Hotel modifié!' }))
        .catch(error => res.status(400).json({ error }));
});

// Ajouter la possiblité d’effacer un hôtel (`DELETE /hotels/:id`)
app.delete("/hotels/:id", async (req, res) => {
    await hotelModel.deleteOne({ _id: req.params.id });
    res.send(`hotel kaput`);
});


// --------------------RESTAURANTS----------------------------
//Créer la route `/restaurants` qui retournera tous les restaurants (`GET /restaurants`)
app.get('/restaurants', async (req, res) => {
    try {
        const restaurant = await restaurantModel.find().lean().exec(); res.status(200).json(restaurant);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong, try again' });
    }
});

// Créer la route /restaurants/:id où l’ID correspondra à l’Object Id dans la base de données (GET /restaurants/:id)
app.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await restaurantModel.findOne({ _id: req.params.id }).lean().exec(); res.status(200).json(restaurant);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: `${_id} does not exist, try again` });
    }
});

// Ajouter la possibilité de créer un nouveau restaurant (POST /restaurants)
// app.post('/restaurants', (req, res) => {
//     const restaurant = new restaurantModel({
//         ...req.body
//     });
//     restaurant.save()
//         .then(() => res.status(201).json({ message: 'Nouveau restaurant enregistré!' }))
//         .catch(error => res.status(400).json({ error }));
// });

app.post('/restaurants', async (req, res) => {
    try {
        await restaurantModel.create(req.body); res.status(200).send({ message: 'Nouveau restaurant enregistré!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong, try again' });
    }
});

// Ajouter la possiblité de mettre à jour le nom d’un restaurant (`PUT /restaurants?name=newName`)
// app.put('/restaurants/:id', (req, res) => {
//     console.log(req.query)
//     const restaurant = restaurantModel.updateOne({ _id: req.params.id }, { name: req.query.name })
//         .then(() => res.status(200).json({ message: 'Nom Restaurant modifié!' }))
//         .catch(error => res.status(400).json({ error }));
// });

app.put('/restaurants/:id', async (req, res) => {
    await restaurantModel.updateOne({ _id: req.params.id }, req.query)
    res.json(req.query);
}).exec();
res.send({ message: 'Informations du Restaurant modifié!' });

// Ajouter la possiblité d’effacer un restaurant (`DELETE /restaurants/:id`)
app.delete("/restaurants/:id", async (req, res) => {
    const result = await restaurantModel.deleteOne({ _id: req.params.id }).exec();
    if (result.deleteCount === 0) {
        res.status(404).json({ message: `Le restaurant n'existe pas` })
    }
    res.send(`restaurant kaput`);
});


// --------------------BONUS----------------------------
// ajoute le paramètre /hotels?limit=3, faites en sorte que le résultat ne retourne que 3 hotels
app.get('/hotels', (req, res) => {
    let limit = 2;
    let page = 0;
    if (req.query.limit) {
        if (!parseInt(req.query.limit)) {
            res.status(400).json({ message: 'Try a number' })
        }
        limit = req.query.limit
    }
    if (req.query.page) {
        page = req.query.page
    }
    try {
        const hotel = hotelModel.aggragate()
            .skip(parseInt(req.query.page * req.query.limit))
            .limit(parseInt(req.query.limit))
            .exec();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something is wrong, try again' });
    }
});








