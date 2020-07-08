import React,{useState} from 'react'
import {connect} from 'react-redux'

import {SignUpContainer, SignUpTitle} from "./sign-up.styles";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {signUpStarts} from "../../redux/user/user.actions";

const SignUp =({signUpStarts})=> {
    const [userData,setUserData]=useState({displayName:'',email:'',password:'',confirmPassword:''})
    const {displayName, email, password, confirmPassword}=userData

    const handleSubmit=async event =>{
        event.preventDefault()

        if(password !== confirmPassword){
            alert("Password don't match")
            return;
        }

        signUpStarts({displayName,email,password})                                                    //call the action creator. destructure the userCredetentials
    }

    const handleChange=event =>{
        const {name,value}=event.target

        setUserData({                                                                           //same as updating the reducer
            ...userData,
            [name]:value
        })
    }


    return (
        <SignUpContainer>
            <SignUpTitle>I do not have an account</SignUpTitle>
            <span>Sign up with email and password</span>

            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    handleChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    handleChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    handleChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    handleChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </SignUpContainer>
    )

}

const mapDispatchToProps=dispatch =>({
    signUpStarts:(userCredentials)=>dispatch(signUpStarts(userCredentials))
})

export default connect(null,mapDispatchToProps)(SignUp)


/*
        Notes:
        use auth object with createUserWithEmailAndPassword method to create a user
        then call the method of creating a user document which will take the created user + additional data of the user name which is an object
        when user is successfully created, form should be cleared
    */