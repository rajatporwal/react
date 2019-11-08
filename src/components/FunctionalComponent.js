import React from 'react';

const User = (props) => {
    let age = props.age ? props.age : 'NA';
    if (props.children) {
        return ( <div> Name: {props.children} | Age: {age} </div>)
      }
      else {
        return <div> Invalid Entry </div>
      }
}

export default User;