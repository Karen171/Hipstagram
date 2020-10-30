import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import SearchUserPage from '../../pages/SearchUserPage';
import Profile from '../../pages/Profile';
import Settings from '../../pages/Settings';
import Current from '../../pages/Profile/Current';
import Feed from '../../pages/Feed';

const Auth = () => {
    return (
        <Router>
            <Switch>
                <Route path="/search-user" component={SearchUserPage}/>
                <Route path="/profile/:id" component={Profile}/>
                <Route path="/current" component={Current}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/feed" component={Feed}/>
                <Redirect to="/current"/>
            </Switch>
        </Router>
    )
}

export default Auth