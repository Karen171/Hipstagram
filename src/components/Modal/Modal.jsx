import React from 'react';
import Input from '../Input';
import image from '../../img/image.jpg';
import likeImg from '../../img/like.png';
import redLike from '../../img/redLike.png';
import send from '../../img/send.png';
import {useState, useEffect} from 'react';
import {likePostThunk, getPostByIdThunk} from '../../store/users/thunks';
import {getCurrentUserInfo, getPostByIdSelector} from '../../store/users/selectors';
import { useDispatch, useSelector } from 'react-redux';
import  './style.scss';


const Modal = ({modal, user, id}) => {
    const [isLiked, setLike] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserInfo)
    const postById = useSelector(getPostByIdSelector)
    console.log(id)
    console.log(postById)
    useEffect(() => {
        dispatch(getPostByIdThunk(id))
    }, [id]);
    useEffect(() => {
        postById.likes && postById.likes.forEach(likedUser => {
            if (likedUser._id === currentUser.id) setLike(true)
        })
    }, [currentUser.id, postById.likes]);
    const like = async () => {
        setLike(!isLiked)
        dispatch(likePostThunk(id))
    }
    const closeModal = () => {
        modal()
    }
    return (
        <div className="modal" onClick={closeModal}>
            <div className="modal__outter">
                <div className="window" onClick={e => {e.stopPropagation()}}>
                    <div className="postImage">
                        <img src={postById.imgUrl}/>
                    </div>
                    <div>
                        <div className="userInfo">
                            <img src={user.avatar || image}/>
                            <div>
                                <p><b>{user.firstName}</b></p>
                            </div>
                        </div>
                        <div className="comments">
                            <img src={image}/>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, ratione? Dolor, quae illo. Tempora hic voluptas, eligendi iste possimus provident ducimus doloremque ipsum veritatis quaerat.</p>
                        </div>
                        <div className="addComment">
                            <div>
                                <span>
                                    <img src={isLiked ? redLike : likeImg} alt="" onClick={like}/>
                                    <img src={send} alt=""/>
                                </span>
                                <p>{postById.likes && postById.likes.length ? 'Likes ' : ''}<b>{postById.likes && postById.likes.length ? postById.likes[0].login : 'no likes'} </b> {postById.likes && postById.likes.length > 1 ? 'and' : ''} <b>{postById.likes && postById.likes.length > 1 ? postById.likes.length - 1 : ''}</b> {postById.likes && postById.likes.length > 1 ? 'other...' : ''}</p>
                            </div>
                            <Input placeholder="write a comment"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;