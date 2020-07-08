import React from 'react';
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect";
import {withRouter} from 'react-router-dom'

import CartItem from "../cart-item/cart-item.component";


import {toggleCart} from "../../redux/cart/cart.actions";
import {selectCartItems} from "../../redux/cart/cart.selectors";

import {CartDropdownButton, CartDropdownContainer, CartItemsContainer, EmptyMessageContainer} from "./cart-dropdown.styles";

const CartDropdown=({cartItems,history,dispatch}) =>{
    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length
                        ?(
                            cartItems.map(cartItem=>(
                            <CartItem key={cartItem.id} item={cartItem}/>
                            ))
                        )
                        :(
                            <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
                        )
                }
            </CartItemsContainer>
            <CartDropdownButton
                onClick={()=>{
                    history.push('/checkout')
                    dispatch(toggleCart())
                }}
            >GO TO CHECKOUT
            </CartDropdownButton>
        </CartDropdownContainer>
    )
}

const mapStateToProps =createStructuredSelector ({
   cartItems:selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown))

/*
    for cartItems in mapStateToProps:

    it is abbreviation of
    mapStateToProps=state=>({
    cartItems:state.cart.cartItems....cart is the reducer name "cart:cartReducer" in store conigiguration
    })
    {cart:{}} is a nested way of destructuring.

    for performance issues, we have noticed that cartItems is get rendered unnecessarly even if there in no change in the state of the cart reducer.
    since the whole state of the app is holding the user & cart state, if a user is signed in for exaamle, the cart state will mapStateToProps and cartList will get rendered unnecessarly
    reselect is a library that help to solve this challenge by keep memorizing the last state and not render if there is no change in the cart state
    selectCartItems is a function that takes the state and keep memorizing the cart state

    dispatch object is included internally through the use of connect component. it can be used without the use of mapDispactchToProps

    whenever checkout button is clicked, 2 actions should be added. first is to push for new url of the checkout page and second is dispatch action for toggle the cart icon
    so hidden property will be true and the dropdown menu will be diapeared. and only the checkout page will be kept seen
*/