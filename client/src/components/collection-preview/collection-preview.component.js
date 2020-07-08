import React from 'react';
import {withRouter} from 'react-router-dom'

import CollectionItem from "../collection-item/collection-item.component";

import {CollectionPreviewContainer, PreviewContainer, TitleContainer} from "./collection-preview.styles";

const CollectionPreview =({title, items,history,match}) => {
    return(
        <CollectionPreviewContainer >
            <TitleContainer onClick={()=>history.push(`${match.path}/${title.toLowerCase()}`)}>{title.toUpperCase()}</TitleContainer>
            <PreviewContainer className='preview'>
                {items
                    .filter((item,index) => index<4)
                    .map(item =>(
                    <CollectionItem item={item} key={item.id}/>
                ))}
            </PreviewContainer>
        </CollectionPreviewContainer>
    )
}

export default withRouter( CollectionPreview)