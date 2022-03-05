import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {User} from "../models/users";

const Nav = () => {

    const [user, setUser] = useState(new User());

    useEffect(() => {
        (
        async () => {

            const {data} = await axios.get("user", {withCredentials: true});
            setUser(new User(
                data.id,
                data.first_name,
                data.last_name,
                data.email,
                data.role
            ))

        }) ()}, []);

    const logout = async () => {
        await axios.post('logout', {}, {withCredentials: true});
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/#">Practice app</a>
            <ul className="my-2 my-md-0 mr-md-3">
                <Link to={'/profile'} className="p-2 text-white">{user.name}</Link>
                <Link to={'/login'} className="p-2 text-white" onClick={logout}
                >Sign Out</Link>
            </ul>
        </nav>
    );
}

export default Nav;