import React from "react";

export default React.memo(props => {
  console.log("val =", props.val);                      // will runs only when props changes
  return <div>{props.val}</div>;
});