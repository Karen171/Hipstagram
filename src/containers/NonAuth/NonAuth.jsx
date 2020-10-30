import React, { useRef } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FieldContainer from '../../components/FieldContainer';
import Wrapper from '../../components/Wrapper';
import logo from '../../img/logo.svg';
import { registrationThunk, loginThunk } from '../../store/users/thunks';
import { loginValidationData, emailValidationData, passwordValidationData } from '../../constant/formPatterns';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import './style.scss';


const Registration = () => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch();
    const onSubmit = (userData) => {
        dispatch(registrationThunk(userData));
    }
    return (
        <>
            
            <div className="regWrapper">
                <p>Sign Up</p>
                <form className="signUp" onSubmit={handleSubmit(onSubmit)}>
                    <FieldContainer label="login:" error={errors.login}>
                        <Input
                        type="text"
                        placeholder="Enter your login"
                        name="login"
                        link={register(loginValidationData)}
                        />
                    </FieldContainer>
                    <FieldContainer label="password:" error={errors.password}>
                        <Input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        link={register(passwordValidationData)}
                        />
                    </FieldContainer>
                    <FieldContainer label="email:" error={errors.email}>
                        <Input
                        type="text"
                        placeholder="Enter your email"
                        name="email"
                        link={register(emailValidationData)}
                        />
                    </FieldContainer>
                    <Button type="submit" value="Sign Up"></Button>
                    <p>If you have account you can <Link to="/login">Login</Link></p>
                </form>
            </div>
        </>
    )
}

const Login = () => {
    const {register, handleSubmit, errors} = useForm();
    const dispatch = useDispatch()
    const onSubmit = (userData) => {
        dispatch(loginThunk(userData))
    }
    return (
        <>
            <div className="loginWrapper">
                <p>Sign In</p>
                <form className="signIn" onSubmit={handleSubmit(onSubmit)}>
                    <FieldContainer label="login:" error={errors.login}>
                        <Input
                        type="text"
                        placeholder="Enter your login"
                        name="login"
                        link={register(loginValidationData)}
                        />
                    </FieldContainer>
                    <FieldContainer label="password:" error={errors.password}>
                        <Input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        link={register(passwordValidationData)}
                        />
                    </FieldContainer>
                    <Button type="submit" value="Sign In"></Button>
                    <p>If you not have account you can <Link to="/registration">Registration</Link></p>
                </form>
            </div>
        </>
    )
}

const NonAuth = () => {
    return (
        <section className="mainPage">
            <div className="banner"></div>
            <Wrapper>
                <div className="logo">
                    <img src={logo}/>
                    <h1 className="h1">HIPSTAGRAM</h1>
                </div>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/registration' component={Registration}/>
                    <Redirect to='/login'/>
                </Switch>
            </Wrapper>
        </section>
    )
}

export default NonAuth