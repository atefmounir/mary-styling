import ShopActionTypes from "./shop.types";

const INITIAL_STATE ={
    collections:null,                              //will be loaded by collections node from firestore DB
    isFetching:false,                              //for spinner
    errorMessage:undefined                         //handling error messages of fetching
}


const shopReducer = (state=INITIAL_STATE, action) =>{
    switch(action.type) {

        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return{
                ...state,
                isFetching: true
            }

        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return{
                ...state,
                isFetching:false,
                collections:action.payload
            }

        case ShopActionTypes.FETCH_COLLECTIONS_END:
            return{
                ...state,
                isFetching:false,
                errorMessage: action.payload
            }

        default: return state
    }
}

export default shopReducer