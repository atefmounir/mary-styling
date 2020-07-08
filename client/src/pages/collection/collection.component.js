import React from 'react';
import {connect} from 'react-redux'

import CollectionItem from "../../components/collection-item/collection-item.component";

import {selectCollection} from "../../redux/shop/shop.selectors";

import {CollectionPageContainer, CollectionTitle, CollectionItemsContainer} from "./collection.styles";


const CollectionPage =({collection})=>{
    const {title,items}=collection

    return (
        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemsContainer>
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </CollectionItemsContainer>
        </CollectionPageContainer>
    )
}

const mapStateToProps=(state,ownProps) =>({
    collection:selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)

/*
    Notes:
    ownProps is props of the component that contained by connect component
    selectCollection is a selector that takes the url params of the collection ;params means the id ; and return the selector points at this specific id
    selectCollection is considered as a function that takes the state and returns the selector. this concept is called currying in JS
    since CollectionPage is wrapped by a Route component in ShopPage, it can access to the match property and in turns can access to params
    collectionId is the name of the params defined in the ShopPage as a nested route to ShopPage
*/