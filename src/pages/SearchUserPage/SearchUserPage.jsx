import React from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import NotFound from '../../components/NotFound';
import loader from '../../img/loader.gif'
import  './style.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsersThunk,
         getCurrentUserThunk, 
         followUserThunk, 
         getSelectedUserThunk, 
         getUsersByLoginThunk } from '../../store/users/thunks';

import { getUsersSelector,
         getCurrentUserInfo,
         getUsersByLoginSelector } from '../../store/users/selectors';

import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import anon from '../../img/anon.png';


const UserCard = ({user, path, avatar, login, dispatch}) => {
    const [isFollow, setIsFollow] = useState(false);
    const {following} = useSelector(getCurrentUserInfo);
    useEffect(() => {
        following && following.forEach(follower => {
            if (follower.id === user._id) setIsFollow(true)
        })
    }, [following, user._id])
    const follow = async () => {
        dispatch(followUserThunk(user._id));
        setIsFollow(!isFollow);
    }
    return (
        <div className="userWrapper">
            <Link to={path}>
                <div>
                    <img src={avatar} alt=""/>
                </div>
            </Link>
            <p><b>{login}</b></p>
            <Button value={isFollow ? "Unfollow" : "Follow"} onClick={follow}/>
        </div>
    )
}

const SearchUserPage = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const currentUser = useSelector(getCurrentUserInfo)
    const users = [...useSelector(getUsersSelector)]
    const usersByLogin = [...useSelector(getUsersByLoginSelector)]
    const usersList = usersByLogin.length === 0 ? [] : usersByLogin;
    useEffect(() => {
        dispatch(getUsersThunk())
        dispatch(getCurrentUserThunk({loading: setLoading}))
        dispatch(getUsersByLoginThunk(''))
    }, [dispatch])
    
    usersList.forEach((user, i) => {
        user._id === currentUser.id && usersList.splice(i, 1);
    })
    return (
        <>
            <Header path={true} message="Search"/>
            <div className="outterWrapper">
                
                <Wrapper>
                    {
                        loading ?

                        <>
                            {usersList.length > 0 ?
                            <>
                            {usersList.map(user => {
                                return <UserCard 
                                login={user.login} 
                                avatar={user.avatar || anon} 
                                key={user._id} 
                                path={`/profile/${user._id}`}
                                currentUser={currentUser}
                                user={user}
                                dispatch={dispatch}
                                />
                            }) }
                            </> :
                            <NotFound />}
                        </> :
                        
                        <img src={loader}/>
                    }
                </Wrapper>
            </div>
        </>
    );
}

export default SearchUserPage;