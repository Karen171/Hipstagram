import React, { useState, useEffect  } from 'react';
import Wrapper from '../../components/Wrapper';
import Header from '../../components/Header';
import FieldContainer from '../../components/FieldContainer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import anon from '../../img/anon.png'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrUserThunk, updatePasswordThunk, getCurrentUserThunk } from '../../store/users/thunks';
import { getCurrentUserInfo } from '../../store/users/selectors';
import {nameValidationData, passwordValidationData} from '../../constant/formPatterns'
import  './style.scss';



const ChangePassword = ({dispatch}) => {
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (userData) => {
        userData.password === userData.confirmPassword && dispatch(updatePasswordThunk(userData))
        console.log(userData)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Change password:</p>
            <FieldContainer error={errors.password}>
                <Input
                type="password"
                placeholder="Enter your new password"
                name="password"
                link={register(passwordValidationData)}
                />
            </FieldContainer>
            <FieldContainer>
                <Input
                type="password"
                placeholder="Confirm your new password"
                name="confirmPassword"
                link={register()}
                />
            </FieldContainer>
            <Button value="Change"/>
        </form>
    )
}

const ChangeInfo = ({dispatch, currentUser}) => {
    const {register, handleSubmit, errors} = useForm();
    const [avatar, setAvatar] = useState(currentUser.avatar || anon);
    const onSubmit = ({firstName, lastName}) => {
        dispatch(updateCurrUserThunk({
            firstName,
            lastName,
            avatar: avatar
        }))
    }
    
    const handleAvatarChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => setAvatar(reader.result);
        reader.readAsDataURL(file);
    }
    return (
        <div className="formContainer">
            <div className="avatarContainer">
                <img src={currentUser.avatar || anon} alt=""/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Change avatar:</p>
                <FieldContainer>
                    <Input
                    name="file"
                    type="file"
                    onChange={handleAvatarChange}
                    />
                </FieldContainer>
                <p>Change Info:</p>
                <FieldContainer>
                    <Input
                    type="text"
                    placeholder="Enter your firstname"
                    name="firstName"
                    link={register(nameValidationData)}
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                    type="text"
                    placeholder="Enter your lastname"
                    name="lastName"
                    link={register(nameValidationData)}
                    />
                </FieldContainer>
                <Button value="Change"/>
            </form>
        </div>
    )
}

const Settings = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUserThunk());
    }, [dispatch])
    const currentUser = useSelector(getCurrentUserInfo);
    return (
        <>
            <Header message="Settings"/>
            <Wrapper>
                <div>
                    <ChangeInfo dispatch={dispatch} currentUser={currentUser}/>
                    <ChangePassword dispatch={dispatch}/>
                </div>
            </Wrapper>
        </>
    );
}

export default Settings;