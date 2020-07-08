import React from 'react';
import {withRouter} from 'react-router-dom'

import {BackgroundImageContainer, ContentContainer, ContentSubtitle, ContentTitle, MenuItemContainer} from "./menu-item.styles";


const MenuItem =({title,imageUrl,size,history,match,linkUrl}) => {
    return (
        <MenuItemContainer size={size} onClick={() => {history.push(`${match.url}${linkUrl}`)}}>
            <BackgroundImageContainer className="background-image" imageUrl={imageUrl}/>
            <ContentContainer className="content">
                <ContentTitle>{title.toUpperCase()}</ContentTitle>
                <ContentSubtitle>Shop Now</ContentSubtitle>
            </ContentContainer>
        </MenuItemContainer>
    )
}

export default withRouter(MenuItem)