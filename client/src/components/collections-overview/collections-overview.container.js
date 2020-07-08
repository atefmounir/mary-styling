import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import {selectCollectionsFetching} from "../../redux/shop/shop.selectors";
import CollectionsOverview from "./collections-overview.component";
import WithSpinner from "../with-spinner/with-spinner.component";


const mapStateToProps=createStructuredSelector({
    isLoading: selectCollectionsFetching
})

const CollectionsOverviewContainer= compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)


export default CollectionsOverviewContainer


/*
    Notes:
    compose is useful for destructuring the following code
    export const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectonsOverview))
*/