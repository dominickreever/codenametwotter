import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import SideNavbar from '../layout/SideNavbar';

export default function Home() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory()

    useEffect(() => {
        if(!userData.user) history.push("/");
    });

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
        history.push("/");
    };

    return (
            <div className="home-page">
                <i className="fas fa-crow"></i>
                <h1>Welcome to Twotter</h1>
                <input className="logout-btn" onClick={logout} type="submit" value="Log out" />
            </div> 
    )
}