import React from 'react';
import Input from '../Input';
import SearchField from '../SearchField'
import glass from '../../img/search_icon.png';
import home from '../../img/home.png'
import glass3 from '../../img/glass3.png'
import logoutIcon from '../../img/logout_icon.png';
import userIcon from '../../img/user_icon.png';
import settings from '../../img/settings.jpg';
import feed from '../../img/feed.png'
import { getCurrentUserThunk, logoutThunk } from '../../store/users/thunks';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import  './style.scss';
import SearchUserPage from '../../pages/SearchUserPage';


const Header = (props) => {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutThunk())
    }
    const myProfile = () => {
        dispatch(getCurrentUserThunk())
    }
    return (
        <header className="header">
            { props.path ? <SearchField dispatch={dispatch}/> : <Link to="/search-user"><img className="glassIcon" src={glass3}/></Link>}
            <p className="header__message">{props.message}</p>
            <div className="icons">
                <Link to="/settings"><img src={settings} alt=""/></Link>
                <Link to="/current"><img src={userIcon} alt="" onClick={myProfile}/></Link>
                <Link to="/feed"><img src={home} alt=""/></Link>
                <img src={logoutIcon} alt="" onClick={logout}/>
            </div>
        </header>
    );
}

export default Header;