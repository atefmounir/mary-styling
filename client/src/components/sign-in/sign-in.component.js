import React,{useState} from 'react'
import {connect} from 'react-redux'

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {emailSignInStarts, googleSignInStarts} from "../../redux/user/user.actions";

import {ButtonsBarContainer, SignInContainer, SignInTitle} from "./sign-in.styles";



const SignIn=({emailSignInStarts,googleSignInStarts})=>{
    const [userCredentials,setUserCredentials]=useState({email:'',password:''})
    const {email, password} =userCredentials


    const handleSubmit=async event => {
        event.preventDefault();

        emailSignInStarts(email, password)                                                           //call the action creator- give the email & password
    }

    const handleChange=event =>{
        const {value,name}=event.target

        setUserCredentials({                                                                   //same as we did for updating the reducer
            ...userCredentials,
            [name]:value
        })
    }

    return (
        <SignInContainer>
            <SignInTitle>I already have an account</SignInTitle>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>

                <FormInput
                    name='email'
                    type='email'
                    value={email}
                    handleChange={handleChange}
                    label='email'
                    required
                />

                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label='password'
                    required
                />

                <ButtonsBarContainer>
                    <CustomButton type='submit'>SIGN IN</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStarts}  isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                </ButtonsBarContainer>

            </form>
        </SignInContainer>
        )

}

const mapDispatchToProps=dispatch =>({
    googleSignInStarts:()=>dispatch(googleSignInStarts()),
    emailSignInStarts:(email,password)=>dispatch(emailSignInStarts({email, password}))
})

export default connect(null,mapDispatchToProps)(SignIn)


/*
    Notes:
    For google sign in button, if we put the type as submit, it will cause problems on the sign in process. it has to be of type button
*/