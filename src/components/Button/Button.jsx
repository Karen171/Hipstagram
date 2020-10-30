import React from 'react';
import  './style.scss';

const Button = (props) => {
    return (
        <button className="button" onClick={props.onClick} type={props.type}>
            {props.value}
        </button>
    );
}

export default Button;