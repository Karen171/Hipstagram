import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import anon from '../../img/anon.png';
import loader from '../../img/loader.gif';
import { getCurrentUserThunk, getSelectedUserThunk, followUserThunk} from '../../store/users/thunks';
import { 
         getSelectedUserSelector,
         getCurrentUserInfo } from '../../store/users/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import  './style.scss';

const Publication = ({imgUrl, post, modal, setUserPostId}) => {
    const modalOpen = (e) => {
        // e.stopPropagation();
        modal();
        setUserPostId(post._id)
    } 
    console.log(post._id)
    return (
        <div className="publication"> 
            <img className="publication__img" src={imgUrl} onClick={modalOpen}/>
        </div>
    )
}

const PublicationsUser = ({modal, user ,setUserPostId}) => {
    return (
        <>
            {
                user.posts && user.posts.map(post => {
                    return <Publication imgUrl={post.imgUrl} key={post._id} modal={modal} post={post} user={user} setUserPostId={setUserPostId}/>
                })
            }
        </>
    );
}


const Profile = ({user, modal, setUserPostId, dispatch}) => {
    const [isFollow, setIsFollow] = useState(false);
    const {following} = useSelector(getCurrentUserInfo);
    console.log(user.id)
    console.log(following)
    useEffect(() => {
        dispatch(getSelectedUserThunk(user.id))
        dispatch(getCurrentUserThunk())
    }, [user.id])
    useEffect(() => {
        following && following.forEach(follower => {
            if (follower.id === user.id) {
                setIsFollow(true)
            }
        })
    }, [following])
    const follow = async () => {
        dispatch(followUserThunk(user.id))
        setIsFollow(!isFollow)
    }
    return (
        <>
           <div className="user">
                <div className="user__avatar"><img  src={user.avatar || anon}/></div>
                <div className="user__info">
                    <span>
                        <p>{user.posts && user.posts.length || 0} posts</p>
                        <p>{user.followingsCount || 0} followings</p>
                        <p>{user.followersCount || 0} followers</p>
                    </span>
                    <Button value={isFollow ? "Unfollow" : "Follow"} onClick={follow}/>
                    <p>{user && user.firstName || '...'} {user && user.lastName || ''}</p>
                </div>
            </div>
            <div className="publications">
                <PublicationsUser user={user} modal={modal} setUserPostId={setUserPostId}/>
            </div> 
        </>
    );
}

const ProfileUser = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [userPostId, setUserPostId] = useState('');
    const modal = () => {
        setIsOpen(!isOpen);
    }
    useEffect(() => {
        dispatch(getSelectedUserThunk({id: id, loading: setLoading}));
    }, []);
    const user = { ...useSelector(getSelectedUserSelector) }
    return (
        <>
            <Header message={user.login}/>
            <div className="outterWrapper">
                    <Wrapper>
                        {
                            loading ?
                            <>
                                <Profile user={user} modal={modal} setUserPostId={setUserPostId} dispatch={dispatch}/>
                                {isOpen && <Modal modal={modal} user={user} id={userPostId}/>}
                            </> :
                            <img src={loader}/>
                        }
                        
                    </Wrapper>
            </div>
        </>
    )
}

export default ProfileUser;