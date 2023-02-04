const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

const mercadopago = require("mercadopago");// SDK de Mercado Pago
const bodyParser = require('body-parser')

// middleare
app.use(bodyParser.urlencoded({extended:false}))

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

// routes
app.post('/checkout',(req,res)=>{
    const preference = {
        items:[
            {
                title: req.body.title,
                unit_price: parseInt(req.body.price),
                quantity: 1
            }
        ]
    }
    mercadopago.preferences.create(preference)
        .then(function(response){
            console.log(response.body.sandbox_init_point);
            res.redirect(response.body.sandbox_init_point)
        })
        .catch(function(error){
            console.log(error);
        })
    // res.send('<h1>Hola desde checkout</h1>')
})

app.listen(3000, ()=>{
    console.log(`Server on port 3000`);
})