const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./model/Product.js');

const app = express();



mongoose.connect('mongodb+srv://codehero:swizz20GANG@cluster0-qjkfe.mongodb.net/products?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyparser.json());

app.post('/api/products',(req, res, next)=>{
    const product = new Product();
    product.save()
    .then(()=>res.status(200).json({message:"produit ajouté avec succès"}))
    .catch((error) =>res.status(400).json(error));
})


app.get('/api/products', (req, res, next) =>{
    Product.find()
    .then(products=>res.status(200).json(products))
    .catch(error => res.status(400).json({error}));
});

app.get('/api/products/:id', (req, res, next)=>{
    Product.findOne({_id : req.params._id})
    .then(product => res.status(200).json(product))
    .catch(error =>res.status(400).json({error}))
})

app.delete('/api/products/:id', (req, res, next) =>{
    Product.deleteOne({_id: req.params._id})
    .then(() => res.status(200).json({message:'Supprimer avec succès!'}))
    .catch((error) =>res.status(400).json(error))
})

app.put('/api/products/:id', (req, res, next) =>{
   Product.updateOne({_id:req.params._id})
   .then(() =>res.status(200).json({message:"mise à jour éffectuée"}))
   .catch((err) => res.status(400).json({err}))
})


module.exports = app;