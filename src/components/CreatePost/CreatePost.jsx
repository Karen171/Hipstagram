import React from 'react';
import Input from '../Input';
import Button from '../Button';
import FieldContainer from '../FieldContainer'
import {createPostThunk} from '../../store/users/thunks';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import  './style.scss';


const CreatePost = ({modalPost}) => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const onSubmit = (userData) => {
        console.log(userData)
        const file = userData.file[0]
        console.log(file.size)
        console.log(userData.title)
        const postData = new FormData()
        if(file.size < 1000000){
            postData.append('image', file)
            postData.append('title', userData.title)
            dispatch(createPostThunk({postData}));
            modalPost();
        }
        console.log('error: big size')
    }
    const closeModalPost = () => {
        modalPost();
    }
    return (
        <div className="modal" onClick={closeModalPost}>
            <div className="modal__outter">
                <div className="window" onClick={e => {e.stopPropagation()}}>
                    <form className="createPost" onSubmit={handleSubmit(onSubmit)}>
                        <FieldContainer label="Enter your title:">
                            <Input
                            type="text"
                            placeholder="title"
                            name="title"
                            link={register({required: true})}
                            />
                        </FieldContainer>
                        <FieldContainer label="Upload your image:">
                            <Input
                            type="file"
                            name="file"
                            link={register()}
                            />
                        </FieldContainer>
                        <Button type="submit" value="Create post"></Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;