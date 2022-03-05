import React, { SyntheticEvent, useState} from 'react';
import '../Login.css'
import axios from 'axios';
import {Navigate} from "react-router-dom";

const Register = () => {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('register', {
            first_name,
            last_name,
            email,
            password,
            confirm_password,
        }, {withCredentials: true});

        setRedirect(true);

    }


        if (redirect) {
            return (
                <Navigate to="/login"/>)
        }
        return (
            <main className="form-signin">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>


                    <input className="form-control" placeholder="First Name" required
                           onChange={e => setFirstName(e.target.value)}/>

                    <input className="form-control" placeholder="Last Name" required
                           onChange={e => setLastName(e.target.value)}/>

                    <input type="email" className="form-control" placeholder="E-mail" required
                           onChange={e => setEmail(e.target.value)}/>

                    <input type="password" className="form-control" placeholder="Password" required
                           onChange={e => setPassword(e.target.value)}/>

                    <input type="password" className="form-control" placeholder="Password confirm" required
                           onChange={e => setConfirmPassword(e.target.value)}/>


                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </main>
        );
    }


export default Register;