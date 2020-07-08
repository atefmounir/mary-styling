import React from 'react';

import {CartItemContainer,CartImage, ItemDetailsContainer} from "./cart-item.styles";

const CartItem=({item:{imageUrl,price,name,quantity}})=>{
    return (
        <CartItemContainer>
            <CartImage src={imageUrl} alt='item'/>
            <ItemDetailsContainer className='item-details'>
                <span>{name}</span>
                <span>{quantity} * ${price}</span>
            </ItemDetailsContainer>
        </CartItemContainer>
    )
}

export default CartItem
