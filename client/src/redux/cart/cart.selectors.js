import {createSelector} from 'reselect'

/*
   Notes:
   Sequence of executing the selector is started from calling "selectCartItemsCount" in card-icon component to accumulate the quantity of items added to cart.
   selectCartItemsCount will hold the state and then its referenced to [selectCartItems] which in turns referenced to [selectCart] which is finally referenced to the cart reducer object.
   the cart object will be taken in the selectCartItems function and craete a selector and passes the cartItems.
   the cartItems will be taken by the selectCartItemsCount and create a selectot and execute the reduce function to get the accumulated quantity value
   all theses steps is to create a memorized on a specific selector for the cartItems.
   after creating this selector for cartItems, it can be replaced anywhere in the app.
*/

const selectCart=state =>state.cart

export const selectCartItems=createSelector(
    [selectCart],
    (cart) =>cart.cartItems
)

export const selectCartVisible=createSelector(
    [selectCart],
    (cart) =>cart.hidden
)

export const selectCartItemsCount=createSelector(
    [selectCartItems],
    (cartItems)=>cartItems.reduce((accQuantity, cartItem) => accQuantity + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems)=>cartItems.reduce((accQuantity, cartItem) => accQuantity + cartItem.quantity * cartItem.price, 0)
)