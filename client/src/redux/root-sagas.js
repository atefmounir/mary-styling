import {all,call} from 'redux-saga/effects'

import {shopSagas} from "./shop/shop.sagas";
import {userSagas} from "./user/user.sagas";
import {cartSagas} from "./cart/cart-sagas";



export default function* rootSaga() {
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas)
    ])
}


/*
    Notes:
    all is better that using casacded yields due to its dependency on each other. it is called one by one.
    but with all, we can run any of yields inside the array separately at any time.
*/