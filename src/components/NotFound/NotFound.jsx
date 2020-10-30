import React from 'react';
import userNotFound from '../../img/user_not_found.png'
import  './style.scss';


const NotFound = (props) => {
    return (
        <div className="notFound">
            <img src={userNotFound} alt="not_found"/>
            <p>User not found</p>
        </div>
    );
}

export default NotFound;