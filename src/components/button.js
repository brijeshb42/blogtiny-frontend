import React from 'react';

export default (props) => {
  let size = "";
  let color = "";
  let outline = "";
  if (props.size) {
    size = " is-" + props.size;
  }
  if (props.color) {
    color = " is-" + props.color;
  }
  if (props.outline) {
    outline = " is-outlined";
  }
  let className = "button";
  if (props.className) {
    className = " " + props.className;
  }
  className += color + size + outline;
  return (
    <button className={className} {...props}>
      {props.children}
    </button>
  );
};
