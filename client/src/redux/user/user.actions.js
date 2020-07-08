import UserActionTypes from "./user.types";


export const googleSignInStarts=() => ({
    type:UserActionTypes.GOOGLE_SIGN_IN_STARTS
})

export const emailSignInStarts=(emailAndPassword) => ({                                       //email & password coming as an object into emailAndPassword
    type:UserActionTypes.EMAIL_SIGN_IN_STARTS,
    payload:emailAndPassword
})

export const signInSuccess=(user) => ({
    type:UserActionTypes.SIGN_IN_SUCCESS,
    payload:user
})

export const signInFails=(error)=>({
    type:UserActionTypes.SIGN_IN_FAILS,
    payload:error
})

export const checkUserSession=() => ({
    type:UserActionTypes.CHECK_USER_SESSION
})

export const signOutStarts=() => ({
    type:UserActionTypes.SIGN_OUT_STARTS
})

export const signOutSuccess=() => ({
    type:UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFails=(error) => ({
    type:UserActionTypes.SIGN_OUT_FAILS,
    payload:error
})

export const signUpStarts=(userCredentials)=>({
    type:UserActionTypes.SIGN_UP_STARTS,
    payload:userCredentials
})

export const signUpSuccess=({user,additionalData})=>({
    type:UserActionTypes.SIGN_UP_SUCCESS,
    payload:{user,additionalData}
})

export const signUpFails=(error)=>({
    type:UserActionTypes.SIGN_UP_FAILS,
    payload:error
})


/*
    Notes:
    actions is a function that can take a payload or not, and returns an object
    syntax can be ()=>({}). the inner {} is the returned object. the outer () is instead of writing return keyword
    it can be writter like that: ()=>{ return {}}

*/