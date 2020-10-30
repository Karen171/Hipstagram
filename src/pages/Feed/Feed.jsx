import React from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import Input from '../../components/Input';
import likeImg from '../../img/like.png';
import redLike from '../../img/redLike.png';
import send from '../../img/send.png';
import loader from '../../img/loader.gif'
import {getFeedPostsThunk, likePostThunk, getCurrentUserThunk} from '../../store/users/thunks';
import {getFeedsSelector, getCurrentUserInfo} from '../../store/users/selectors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  './style.scss';



const Posts = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserInfo)
    
    useEffect(() => {
        dispatch(getFeedPostsThunk({loading: setLoading}))
    }, [])
    
    const feed = useSelector(getFeedsSelector);
    return (
        <div className="postsContainer">
            {
                
               loading ? 
               (feed.map(post => {
                   return <PostContainer imgUrl={post.imgUrl} key={post._id} post={post} dispatch={dispatch} currentUser={currentUser}/>
               })) : (<img src={loader}/>)

            }
        </div>
    )
}

const PostContainer = ({post, dispatch, currentUser}) => {
    const [isLiked, setLike] = useState(false);
    // const currentUser = useSelector(getCurrentUserInfo)\
    useEffect(() => {
        dispatch(getCurrentUserThunk())
    }, [])
    useEffect(() => {
        post.likes && post.likes.forEach(likedUser => {
            if (likedUser._id === currentUser.id) setLike(true)
        })
    }, [post.likes, currentUser.id]);
    const like = async () => {
        setLike(!isLiked)
        dispatch(likePostThunk(post._id))
    }
    return (
        <div className="feedContainer">
            <div className="imageContainer">
                <img src={post.imgUrl}/>
            </div>
            <div className="addComment">
                <div>
                    <span>
                        <img src={isLiked ? redLike : likeImg} alt="" onClick={like}/>
                        <img src={send} alt=""/>
                    </span>
                    <p>{post.likes && post.likes.length ? 'Likes ' : ''}<b>{post.likes && post.likes.length ? post.likes[0].login : 'no likes'} </b> {post.likes && post.likes.length > 1 ? 'and' : ''} <b>{post.likes && post.likes.length > 1 ? post.likes.length - 1 : ''}</b> {post.likes && post.likes.length > 1 ? 'other...' : ''}</p>
                </div>
                <Input placeholder="write a comment"/>
            </div>
        </div>
    )
}

const Feed = () => {
    
    return (
        <>
            <Header message="Feed"/>
            <div className="outterWrapper" >
                <Wrapper>
                    <Posts />
                </Wrapper>
            </div>
        </>
    );
}

export default Feed;