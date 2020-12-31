import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import ErrorNotice from './ErrorNotice';

export default function RightIndex() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory()

    const login = () => history.push('/login');
    const signup = () => history.push('/signup');

    const submit = async (e) => {
        e.preventDefault();

        try {
           const loginUser = {
            email,
            password
        };
        const loginRes = await Axios.post(
            "http://localhost:9000/login",
            loginUser
        );
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/home"); 
        }
        catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
        
    };

    return (
        <div className="rightindex">
            <div>
                <form className="index-login-form" onSubmit={submit}>
                    <input id="index-email" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}></input>
                    <input id="index-password" type="text" placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
                    <input className="index-login-btn" type="submit" value="Log in" />
                </form>
                {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
            </div>
            <div className="index-tagline">
                <i className="fas fa-crow"></i>
                <h1>See what's happening in the world right now</h1>
            </div>
            <div className="index-auth-btns">
                <p className="calltoaction">Join Twotter today.</p>
                <button className="index-signup-btn" onClick={signup}>Sign up</button>
                <br></br>
                <br></br>
                <button className="index-login-btn" onClick={login}>Log in</button>
            </div>
        </div>
    )
}