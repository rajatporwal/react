import React from 'react';

const PropTypesComponent = (props) => {
    return (
        <div>
            <h1>{props.str}</h1>
            <h1>{(props.bool ? 'bool' : 'not bool')}</h1>
            <h1>{(props.strOrNum)}</h1>
            
        </div> 
    )
}

export default PropTypesComponent;

