import {createStore,applyMiddleware} from "redux";
import {persistStore} from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga"

import rootReducer from './root-reducer'
import rootSaga from "./root-sagas";



const sagaMiddleware=createSagaMiddleware()
const middlewares = [sagaMiddleware]

if(process.env.NODE_ENV==='development'){
    middlewares.push(logger)
}

export const store =createStore(rootReducer,applyMiddleware(...middlewares));                  //create the app store
sagaMiddleware.run(rootSaga);                                                                  //run all Saga Middleware

export const persistor =persistStore(store)                                                    //cached the app store into browser for memorizing last status
export default {store,persistor}

/*
    Notes:
    middleware is something between actions and reducers that takes the actions and do some processing and give outputs
    one of those middleware that we can apply is the logger. which helps in the debugging to show all actions that we are entirely created from the app.
    to activate this middleware, we have t import applyMiddleware component from redux package
    to activate the logger, we have to import it from redux-logger package
    all middlewares are passed inside array. the logger is one of them.

    persistStore will cached our store into browser storage depending on certain confgurations
    persistor is a persisted version of our store
*/