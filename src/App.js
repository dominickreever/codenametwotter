import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import Index from './components/pages/Index';
import SignupForm from './components/pages/SignupForm';
import LoginForm from './components/pages/LoginForm';
import Home from './components/pages/Home';
import UserContext from './context/UserContext';

export default function App() {
    const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post("/users/tokenIsValid",
            null,
            { headers: {"x-auth-token": token} });

            if (tokenRes.data) {
                let userRes = await Axios.get("/users/",
                null,
                { headers: { "x-auth-token": token }},
                );
                setUserData({
                    token,
                    user: userRes.data
                });
            }
        };
        checkLoggedIn();
    }, [])

    return (
        <div>
            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }} >
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/signup" component={SignupForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/" component={Index} />
                    </Switch>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    )
}