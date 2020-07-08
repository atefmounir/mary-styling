import React from 'react';


import {FormInputContainer, FormInputLabel, GroupContainer} from "./form-input.styles";

const FormInput = ({handleChange,label, ...otherProps}) =>{
    return (
        <GroupContainer>
            <FormInputContainer onChange={handleChange} {...otherProps}/>
            {
                label ? (<FormInputLabel className={otherProps.value.length ? 'shrink' : ''} >{label}</FormInputLabel>) : null
            }
        </GroupContainer>
    )
}

export default FormInput

/* FormInput is a presentational component to style how label will shrink when focus or typing on input fields and activate a methods on the inputs changes*/