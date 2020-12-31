import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import ErrorNotice from '../layout/ErrorNotice';

export default function SignupForm() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault();
        try {
                    const newUser = {
            name,
            email,
            password
        };
        await Axios.post(
            "/signup",
            newUser
        );
        const loginRes = await Axios.post(
            "/login",
            { email, password }
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
        <div className="signupform-page">
            <i className="fas fa-crow"></i>
            <h1>Create your account</h1>
            {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
            <form onSubmit={submit}>
                <input id="signup-name" placeholder="Name" type="text" onChange={e => setName(e.target.value)}></input>
                <br></br>
                <br></br>
                <input id="signup-email" placeholder="Email" type="email" onChange={e => setEmail(e.target.value)}></input>
                <br></br>
                <br></br>
                <input id="signup-password" placeholder="Password" type="text" onChange={e => setPassword(e.target.value)}></input>
                <br></br>
                <br></br>
                <input className="signupform-btn" type="submit" value="Sign up" />
            </form>
        </div>
    )
}