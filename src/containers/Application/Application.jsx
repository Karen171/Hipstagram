import React from 'react';
import NonAuth from '../NonAuth/NonAuth';
import Auth from '../Auth/Auth';
import { getUserAuthSelector } from '../../store/users/selectors';
import { useSelector } from 'react-redux';

const Application = () => {
    const auth = useSelector(getUserAuthSelector)
    return  auth ? <Auth/> : <NonAuth/> 
}

export default Application