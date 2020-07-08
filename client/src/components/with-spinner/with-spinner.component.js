import React from 'react';
import {SpinnerContainer, SpinnerOverlay} from "./with-spinner.styles";

const WithSpinner =WrappedComponent=> ({isLoading, ...props})=>{
    return (
        isLoading
            ?   <SpinnerOverlay>
                    <SpinnerContainer/>
                </SpinnerOverlay>

            :   <WrappedComponent {...props}/>
    )
}

export default WithSpinner

/*
    Notes:
    HOC structure is to take any component and returns a new functional component which takes isLoading & props as destructured properties of the wrapped componenet

*/