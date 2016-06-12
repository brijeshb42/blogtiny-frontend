import React from 'react';

export default (props) => {
  let clas = "column";
  if (props.className) {
    clas += " " + props.className;
  }
  return (
    <div className="columns is-mobile">
      <div {...props} className={clas}>
        {props.children}
      </div>
    </div>
  );
};
