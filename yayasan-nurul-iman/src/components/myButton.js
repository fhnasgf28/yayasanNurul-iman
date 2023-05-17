import React from 'react';

function MyButton(props) {
  return (
    <button onClick={props.onClick}>
      {props.label}
    </button>
  );
}

export default MyButton;