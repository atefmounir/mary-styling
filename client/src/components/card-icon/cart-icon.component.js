import React from 'react';
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect";

import {toggleCart} from "../../redux/cart/cart.actions";
import {selectCartItemsCount} from "../../redux/cart/cart.selectors";

import {IconContainer, ItemCountContainer, ShoppingIcon} from "./cart-icon.styles";

const CartIcon =({toggleCart,itemCount})=>{
    return(
        <IconContainer  onClick={toggleCart}>
            <ShoppingIcon />
            <ItemCountContainer >{itemCount}</ItemCountContainer>
        </IconContainer>
    )
}

const mapStateToProps=createStructuredSelector({
    itemCount: selectCartItemsCount
})

const mapDispatchToProps=dispatch=>({
    toggleCart:()=>dispatch(toggleCart())
})

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);
