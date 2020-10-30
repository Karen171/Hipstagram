import React, { useState } from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import anon from '../../img/anon.png';
import loader from '../../img/loader.gif'
import { getCurrentUserThunk } from '../../store/users/thunks';
import { getCurrentUserInfo,
         getPostsSelector } from '../../store/users/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CreatePost from '../../components/CreatePost/CreatePost';
import  './style.scss';

const Publication = ({imgUrl, post, user, id}) => {
    const [isOpen, setIsOpen] = useState(false);
    const modal = () => {
        setIsOpen(!isOpen)
    }
    const modalOpen = (e) => {
        e.stopPropagation();
        modal();
    }
    useEffect(() => {

    })
    console.log(id)
    return (
        <div className="publication"> 
            {isOpen && <Modal modal={modal} post={post} user={user} id={id}/>}
            <img className="publication__img" src={imgUrl} onClick={modalOpen}/>
        </div>
    )
}

const PublicationsCurrentUser = ({modal, user}) => {
    return (
        <>
            {
                user.posts && user.posts.map(post => {
                    return <Publication imgUrl={post.imgUrl} key={post._id} modal={modal} post={post} user={user} id={post._id}/>
                })
            }
        </>
    );
}


const Current = () => {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenPostModal, setIsOpenPostModal] = useState(false)
    const dispatch = useDispatch()
    const user = {...useSelector(getCurrentUserInfo)}
    useEffect(() => {
            dispatch(getCurrentUserThunk({loading: setLoading}))
    }, [user]);
    const modal = () => {
        setIsOpen(!isOpen)
    }
    const modalPost = () => {
        setIsOpenPostModal(!isOpenPostModal)
    }
    
    return (
        <>
                <div>
                    <Header message={user.firstName}/>
                    <div className="outterWrapper">
                            <Wrapper>
                                {
                                    loading ?
                                    <>
                                        {isOpenPostModal && <CreatePost modalPost={modalPost}/>}
                                        {isOpen && <Modal modal={modal}/>}
                                        <div className="user">
                                            <div className="user__avatar"><img src={user.avatar || anon}/></div>
                                            <div className="user__info">
                                                <span>
                                                    <p>{user.posts && user.posts.length} posts</p>
                                                    <p>{user.following && user.following.length} followings</p>
                                                    <p>{user.followers && user.followers.length} followers</p>
                                                </span>
                                                <Button value="Add new post" onClick={modalPost}/>
                                                <p>{user && user.firstName || ' '} {user && user.lastName || ' '}</p>
                                            </div>
                                        </div>
                                        <div className="publications">
                                            <PublicationsCurrentUser user={user}/>
                                        </div>
                                    </> :
                                    <img src={loader}/>
                                }
                                
                            </Wrapper>
                    </div>
                </div>
        </>
    );
}

export default Current;