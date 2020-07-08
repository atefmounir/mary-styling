/*
    Notes:
    this utility function resposnsible to take the current array of cartItems & the new added items.
    if the item to add is existed in the array, it means that we need to update only the quantity. the new quantity has to be the old quantity + 1
    note that quantity is a new field that we have created
    if the item to add is not in the cartItems array, it means it is the quantity becomes 1 and we have to add that item as well
    the top issue to consider that we are updatimg all arrays in immutable way
    note that cartItems= [{cartItem},{cartItem},{},...]

    note that filter method is returning a new array
*/
export const addItemToCart =(cartItems,cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem=>cartItem.id===cartItemToAdd.id)

    if(existingCartItem){
        return cartItems.map(cartItem=>cartItem.id===cartItemToAdd.id ?         //returns updating of the current cartItem object + new field for quantity
            {...cartItem, quantity: cartItem.quantity+1} :
            cartItem
        )
    }

    return[...cartItems, {...cartItemToAdd, quantity:1}]                       //returns the new array of prev cartItems + new object of the added item and its new quantity field
}


export const removeItemFromCart=(cartItems,cartItemToRemove) =>{
    const existingCartItem= cartItems.find(cartItem => cartItem.id===cartItemToRemove.id)

    if(existingCartItem.quantity===1){
        return cartItems.filter(cartItem =>cartItem.id !==cartItemToRemove.id)
    }

    return cartItems.map(cartItem =>cartItem.id===cartItemToRemove.id ?
        {...cartItem,quantity:cartItem.quantity-1}:
        cartItem
    )




}

