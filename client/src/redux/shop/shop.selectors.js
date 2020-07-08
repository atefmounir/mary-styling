import {createSelector} from "reselect";


const selectShop =state=>state.shop                                                                     //to select shop reducer

export const selectShopCollections =createSelector(                                                     //to select collections field from shop reducer
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview=createSelector(                                                //to covert the collections object to array of objects for component preview
    [selectShopCollections],
    collections=>collections ? Object.keys(collections).map(key => collections[key]) :[]
)

export const selectCollection=collectionUrlParam=>{                                                     //to sellect specific collection "mens/hat/..." upon receiving paramas
    return (
        createSelector(
            [selectShopCollections],
            collections => (collections ? collections[collectionUrlParam]:null)
        )
    )
}

export const selectCollectionsFetching=createSelector(                                                   //to select isFetching field from shop reducer
    [selectShop],
    shop =>shop.isFetching
)

export const selectCollectionsLoaded=createSelector(                                                     //to select collections field to inform if is loaded
    [selectShop],
    shop =>!! shop.collections
)

/*
    Note:
    we can get the value of specific key using data normalization "collections[collectionUrlParam]" that insted of looping over an array of elements. (e.x collections[hats])
    collections is converted to data normalization "becomes object"
    to loop over the object, we have uses Object.keys which convert it to an array which can use map method
    the obove technique has to be used if we are dealing with data set in object and we need to convert it into any array

    !!{}-->true
*/



