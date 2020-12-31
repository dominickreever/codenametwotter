import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function SideNavbar() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
        history.push("/");
    };

    return (
        <div>
            <Link to="/home">Birdpic</Link>
            <Link to="/home">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/home">Notifications</Link>
            <Link to="/home">Profile</Link>
            <Link to="/home">More</Link>
            <button>Tweet</button>
            <input onClick={logout} type="submit" value="Log out" />
        </div>
    )
}