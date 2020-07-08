import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios'

const StripeCheckoutButton=({price})=>{
    const priceForStripe=price*100
    const publishableKey='pk_test_51GzicJL3yqcIzPq8h9zXNP8GhMHamr0zZQjcrHeK4Z10VdCNoZGQjdjsNk6i5kdZF6uMnMISXw32DpB0tTSwrhj000a56LPr1c'

    const onToken=token => {
       axios({
           url:'payment',                                                     //defining the route name of http request to do the payment. "/payment" & is defined in server.js
           method: 'post',                                                    //post method
           data: {                                                            //data structure will be accessed via req object in the server side "amount & token"
               amount:priceForStripe,
               token
           }
       })
           .then(response =>{
           alert('Payment successful')
       })
           .catch(error => {
               console.log('Payment error', JSON.parse(error))               //parse error response from server and convert it to json
               alert('There is an issue with your payment')
           })
    }

    return(
        <StripeCheckout
            label='Pay Now'
            name='Crown Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton