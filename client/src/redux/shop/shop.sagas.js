import {takeLatest, call, put, all} from 'redux-saga/effects'
import ShopActionTypes from "./shop.types";
import {convetCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";

export function* fetchCollectionsAsync(){
    try{
        const collectionRef = firestore.collection('collections')        //creating the collection reference and set the key name to "collections"

        const snapshot=yield collectionRef.get()                                     //get the snapshot upon Promise returns
        const collectionsMap = yield call(convetCollectionsSnapshotToMap,snapshot)   //wait for results of calling for internal function which takes arg in the 2nd paramerter
        yield put(fetchCollectionsSuccess(collectionsMap))                           //put an action for fetching data is succeed. give the collection map
    }
    catch(err){
        yield put(fetchCollectionsFailure(err.message))
    }
}


export function* onFetchCollectionsStart(){                                           //Saga function generatot will listen to action of start fetching the collections to do async call
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionsAsync)
}


export function* shopSagas(){
    yield all([call(onFetchCollectionsStart)])
}