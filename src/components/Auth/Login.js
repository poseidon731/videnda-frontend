import React, { useState, useRef } from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { Link } from 'react-router-dom';

import AuthService from '../../services/auth.service';
import AppLayout from '../../layouts/App';

const required  =(value)=>{
    if(!value){
        return <div className="alert alert-danger" role="alert">
            This field is required.
        </div>
    }
}

const Login = (props) =>{
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();

    const onChangeEmail = (e)=>{
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = (e)=>{
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogin = (e)=>{
        e.preventDefault();
        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length===0){
            AuthService.login(email, password).then(
                ()=>{
                    props.history.push("/profile");
                    window.location.reload();
                },
                (error)=>{
                    const resMessage=(
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) || error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            )
        }else{
            setLoading(false);
        }
    }

    return (
    <AppLayout>
        <div className="card card-container">
            <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" 
                alt="profile-img"
                className="profile-img-card"
            />
            <Form onSubmit={handleLogin} ref={form}> 
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input 
                        
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validation={[required]}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                    </button>
                </div>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <div className="d-flex justify-content-between bd-highlight mb-3">
                    <small><Link to="/resetpassword/forgotpassword">Forgot Password?</Link></small>
                    <small><Link to="/register">New User? Sign Up!</Link></small>
                </div>
                <CheckButton style={{display: "none"}} ref={checkBtn} />
            </Form>
        </div> 
    </AppLayout>)
}

export default Login;