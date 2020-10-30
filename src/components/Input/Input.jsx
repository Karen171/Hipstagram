import React from 'react';
import  './style.scss';

const Input = (props) => {
    return (
        <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        ref={props.link}
        className="input"
        onChange={props.onChange}
        />
    );
}

export default Input;