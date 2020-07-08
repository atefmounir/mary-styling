import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig={
    key: "root",             //starting point to persist
    storage,                 //place to save
    whitelist:['cart']       //list of reducers that we eant to persist
}

const rootReducer= combineReducers({
    user: userReducer,
    cart:cartReducer,
    directory:directoryReducer,
    shop:shopReducer
})

export default persistReducer(persistConfig, rootReducer)

/*
    Notes:
    user reducer doesn't need to be persisted "stored" since it is managed via auth object of firebase. we need only cart reducer to be persisted
    persistedReducer is a modified version of the app reducer by addind certain configurations to store cart reducer into local storage
*/