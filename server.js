const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')                                               //get bundled with node package

if(process.env.NODE_ENV !== 'production') require('dotenv').config()       //allow process.env to access secret key in development mode

const stripe= require('stripe')(process.env.STRIPE_SECRET_KEY)             //add stripe library and invoke it by passing the secret key from .env which defined in the previous line

const app = express()                                                      //instantiate express to build the server API
const port=process.env.PORT || 8000                                       //in production, Heroku will add it automatically for us


app.use(bodyParser.json())                                                 //convert what written in the body to json
app.use(bodyParser.urlencoded({extended: true}))                           //escape any strange characters in the url

app.use(cors())                                                            //allow access between different ports "server(5000)-client(3000)". cross origin

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'client/build')))           //use static middleware to identify the path of client build version through join method and node directory

    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname,'client/build','index.html'))     //get anu route form index.html file from the build version of the client app. which will be done through express server
    })
}

app.listen(port,err => {
    if (err) throw err                                                     //listening for any error and throw it
    console.log('Server running on port '+port)                            //listening for server running condition
})


app.post('/payment',(req,res)=>{
    const body={                                                           //fields of the body are define in stripe API for creating the charges. "amount,currency,source"
        source:req.body.token.id,                                          //use req object to hold the value of token field comes from StripeCheckout component in client side
        amount:req.body.amount,                                            //use req object to hold the value of amount field comes from StripeCheckout component in client side
        currency:'usd'
    }

    stripe.charges.create(body,(stripeErr,stripeRes)=>{                    //stripe will complete the charges process and give res object to the previous defined req object
        if(stripeErr){
            res
                .status(500)
                .send({error:stripeErr})
        }
        else{
            res
                .status(200)
                .send({success:stripeRes})
        }
    })
})



