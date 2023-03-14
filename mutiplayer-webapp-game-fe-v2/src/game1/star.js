import React from "react";

const Star = props => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  };
  return <div className="star" style={style} />;
};

export default Star;
