import React from 'react';
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect";

import {ReactComponent as Logo} from '../../assets/crown.svg'

import {HeaderContainer, LogoContainer, OptionLink, OptionsContainer} from "./header.styles";

import CartIcon from "../card-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartVisible} from "../../redux/cart/cart.selectors";

import {signOutStarts} from "../../redux/user/user.actions";



const Header = ({currentUser,hidden,signOutStarts})=>{
    return (
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo'/>
            </LogoContainer>
            <OptionsContainer>
               <OptionLink to='/shop'>SHOP</OptionLink>
               <OptionLink to='/contact'>CONTACT</OptionLink>
               {
                   currentUser ?
                       (
                           <OptionLink as='div' onClick={signOutStarts}>SIGN OUT</OptionLink>
                       )
                       :
                       (
                           <OptionLink to='/signin'>SIGN IN</OptionLink>
                       )
               }
               <CartIcon />
           </OptionsContainer>
            {
                hidden ? null : <CartDropdown />
            }
        </HeaderContainer>
    )
}


const mapStateToProps=createStructuredSelector ({
    currentUser:selectCurrentUser,
    hidden:selectCartVisible
})

const mapDispatchToProps=dispatch =>({
    signOutStarts:()=>dispatch(signOutStarts())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header)


/*
    Notes:
    user is the name of userReducer defined in the root reducers.
    currentUser "right side" is defined in the userReducer which holds the action.payload and be accesed through state.user
    currentUser "left side" will hold the value of "state.user.currentUser" and use it in Header component instead of getting it from other statefull component
    it means that through using of redux, we are creating a global store of states that we can access anywhere in the app

    modern way of destructuring: if we need to destruct from state.user.currentUser--> {user:{currentUser}}
    note that for currentUser:currentUser-->can be written as currentUser
    CartDropdown will not be seen if the hidden was true

    for better performance on rendering only needed selector, we have used the structuredSelector to add selectors from different states "user & cart"
*/