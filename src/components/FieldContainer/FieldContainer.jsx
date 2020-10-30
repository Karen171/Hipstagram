import React from 'react';
import './style.scss'

const FieldContainer = ({error, label, children, message}) => {
    return (
        <div className="fieldContainer">
            <label>{label}</label>
            {children}
            {error && <p className="message">{error.message || message}</p>}
        </div>
    )
}

export default FieldContainer