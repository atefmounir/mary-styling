import React,{useEffect} from 'react';
import {Route} from 'react-router-dom'

import {connect} from 'react-redux'

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

import {fetchCollectionsStart} from "../../redux/shop/shop.actions";


const ShopPage=({fetchCollectionsStart,match}) =>{                               //since ShopPage wrapped with Route in App.js, match prop can be accessed

     useEffect(()=>{
         fetchCollectionsStart();
     },[fetchCollectionsStart])


    return (
        <div className='shop-page'>

            <Route exact
                   path={`${match.path}`}
                   component={CollectionsOverviewContainer}
            />

            <Route
                path={`${match.path}/:collectionId`}
                component={CollectionPageContainer}
            />

        </div>
    )
}



const mapDispatchToProps=dispatch =>({
    fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())
})


export default connect(null, mapDispatchToProps)(ShopPage)

/*
    Notes:
    we can access to match property since we are using Route componenet for homePage. please check App.js
    match property has access to path which is dynamically if you are on shop page --> will be /shop. you can check with console.log(match)

    WithSpinner is a higher order component that will wrap any component and returns a new one. it will load the spinner till data is retrieved ascynchronously from firestore

    to cascade the match,location & history props to the non class component, either to use withRouter or Route
    component propery will cascade the props to the defined component like component={CollectionOverview}
    if we need to use render method. then it has to take those props that we need to cascade them to the required component

    since shop page is managing data for CollectionsOverview & CollectionPage components, we have to setup the fetching data process in ShopPage component.
    data fetching from firestore has to be placed in the nearst parent of their childs since it is rendered first.
    in order to do that, we have to convert it into class based component

*/