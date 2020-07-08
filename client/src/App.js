import React,{useEffect} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect";

import './App.css';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/chekout/checkout.component";
import Header from "./components/header/header.component";

import {selectCurrentUser} from "./redux/user/user.selectors";
import {checkUserSession} from "./redux/user/user.actions";




const App=({checkUserSession,currentUser})=>{

    useEffect(()=>{
        checkUserSession()
    },[checkUserSession])                                                        //in [], always put dependencies from things comes from parent component. or actions creators

    return(
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/checkout' component={CheckoutPage}/>
                <Route exact path='/signin'
                       render={()=> currentUser
                        ?
                        (<Redirect to='/' />)
                        :
                        (<SignInAndSignUpPage/>)
                }/>
            </Switch>
        </div>
        )

}

const mapStateToProps=createStructuredSelector ({
    currentUser:selectCurrentUser
})

const mapDispatchToProps=dispatch =>({
    checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);


/*
        Notes:
        initially user is unscubscribed from the auth process. then it will hold the authenticated user even if it is still not stored in DB
        when component is mounted, use Firebase auth to create a user document on DB using firestore.
        userAuth will have a data if user is logged in. "data structured created through auth.onAuthStateChanged"
        userAuth will have access to: id, displayName, email, ...
        if user logged in successfully, user document will be created in DB
        upon document is created, we can make use of the snapshot object to access the created data of the document. it is listening to data changes
        data property is used to get the JSON representation of the created document. data is structured in firebase.utils using useRef.set
        but the data property doesn't return the id. it is only exists in snapshot object
        use data transformation to get the currentUser as an object containing id + document data
        if no userAuth, the onAuthStateChanged will return null and stored on userAuth
*/

