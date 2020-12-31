import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import ErrorNotice from '../layout/ErrorNotice';

export default function LoginForm() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = {
            email,
            password
        };
        const loginRes = await Axios.post(
            "/login",
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
        <div className="loginform-page">
            <i className="fas fa-crow"></i>
            <h1>Log in to Twotter</h1>
            {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
            <form onSubmit={submit}>
                <input id="login-email" placeholder="Email" type="email" onChange={e => setEmail(e.target.value)}></input>
                <br></br>
                <br></br>
                <input id="login-password" placeholder="Password" type="text" onChange={e => setPassword(e.target.value)}></input>
                <br></br>
                <br></br>
                <input className="loginform-btn" type="submit" value="Log in" />
                <br></br>
                <br></br>
                <Link to="/signup">Sign up for Twotter</Link>
            </form>
        </div>
    )
}