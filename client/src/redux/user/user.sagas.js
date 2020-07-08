import {takeLatest,put,call,all} from 'redux-saga/effects'

import {auth, createUserProfileDocument, getCurrentUser, googleProvider} from "../../firebase/firebase.utils";
import UserActionTypes from "./user.types";
import {signInFails, signInSuccess, signOutFails, signOutSuccess, signUpFails, signUpSuccess} from "./user.actions";



export function* getSnapshotFromAcessedUser(userAuth,additionalData){
    try{
        const userRef = yield call(createUserProfileDocument,userAuth,additionalData)       //create user reference "document"
        const userSnapshot = yield userRef.get()                                            //get the snapshot using get API method which returns a promise can be dealed with put

        yield put(signInSuccess({                                                      //dispatch action upon google sign in success
            id:userSnapshot.id,                                                             //document id is stored in snapshot object
            ...userSnapshot.data()                                                          //get the data through using data method
        }))
    }
    catch(err){
        yield put(signInFails(err))                                                         //dispatch action upon google sign in fails
    }
}


export function* signInWithGoogle(){
    try {
        const {user}=yield auth.signInWithPopup(googleProvider)                             //hold the signeIn user. destructuring user field from the result. check result by console
        yield getSnapshotFromAcessedUser(user)
    }
    catch(err) {
        yield put(signInFails(err))                                                         //dispatch action upon google sign in fails
    }
}


export function* signInWithEmail({payload:{email, password}}){                              //destructure the payload "that comes from action creator" into the original object passed to dispatch the action in component side
    try {
        const {user} =yield auth.signInWithEmailAndPassword(email, password)                //signInWithEmailAndPassword is firbase method on Auth object
        yield getSnapshotFromAcessedUser(user)
    }
    catch (err) {
        yield put(signInFails(err))                                                         //dispatch action upon email sign in fails
    }
}


export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser;                                              //getCurrentUser is get the authenticated user through tracking onAuthStateChanged

        if(!userAuth) return                                                                //user is not signed in
        yield getSnapshotFromAcessedUser(userAuth)                                          //get snapShot of the accessed user
    }
    catch (err) {
        yield put(signInFails(err))
    }
}

export function* signOut(){                                                                 //signOut is firebase method on Auth object
    try {
        yield auth.signOut
        yield put(signOutSuccess())
    }
    catch (err) {
        yield put(signOutFails(err))
    }
}


export function*  signUp({payload:{email,password,displayName}}){                           //destructure the userCredetentials in signUpStarts action creator
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password)           //use createUserWithEmailAndPassword method IN Auth object
        yield put(signUpSuccess({                                                           //since signUpSuccess takes user & additional data
            user,
            additionalData:{displayName}                                                    //destructuring the displayName from the additional data
        }))
    }
    catch (err) {
        yield put(signUpFails(err))
    }
}


export function* autoSignInAfterSignUp({payload: {user,additionalData}}) {
    yield getSnapshotFromAcessedUser(user,additionalData)                                  //get the user object and create the document reference and snapshot the data
}





export function* onCheckUserSession(){                                                      //saga generator function to check if user is authenticated at App loading
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)
}


export function* onGoogleSignInStarts(){                                                    //saga generator function get activated on click of google sign in button
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_STARTS,signInWithGoogle)
}

export function* onEmailSignInStarts(){                                                     //saga generator function get activated on click of sign in button
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_STARTS,signInWithEmail)
}

export function* onSignOutStarts(){                                                         //saga generator function get activated on sign out
    yield takeLatest(UserActionTypes.SIGN_OUT_STARTS,signOut)
}

export function* onSignUpStarts(){                                                          //saga generator function get activated on sign up
    yield takeLatest(UserActionTypes.SIGN_UP_STARTS,signUp)
}

export function* onSignUpSuccess(){                                                         //saga generator to auto login after success sign up
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,autoSignInAfterSignUp)
}


export function* userSagas(){                                                                //collect all sagas listener to be used in root-sagas
    yield all([
        call(onGoogleSignInStarts),
        call(onEmailSignInStarts),
        call(onCheckUserSession),
        call(onSignOutStarts),
        call(onSignUpStarts),
        call(onSignUpSuccess)
    ])
}
