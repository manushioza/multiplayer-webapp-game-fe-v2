import React from "react";

const Ship = props => {
  return (
    <div>
      {props.shipDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        };
        return <div className="ship" key={i} style={style} />;
      })}
    </div>
  );
};
export default Ship;
