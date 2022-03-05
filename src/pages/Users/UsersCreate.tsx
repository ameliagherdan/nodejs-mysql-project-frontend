import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Role } from '../../models/role';

const UsersCreate = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);

    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('roles', { withCredentials: true });
                setRoles(data);
            }
        )()
    }, [])



    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('users', {
            first_name,
            last_name,
            email,
            roleId,
        }, { withCredentials: true });
        setRedirect(true);
    }

    if (redirect) {
        return (
            <Navigate to="/users" />)
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Register User</h1>

                <div className='mb-3'>
                    <input className="form-control" placeholder="First Name" required
                        onChange={e => setFirstName(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <input className="form-control" placeholder="Last Name" required
                        onChange={e => setLastName(e.target.value)} />

                </div>

                <div className='mb-3'>
                    <input type="email" className="form-control" placeholder="Email" required
                        onChange={e => setEmail(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <select className="form-control" placeholder="Role" required
                        onChange={e => setRoleId(e.target.value)}>
                        {roles.map((r: Role) => {
                            return (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            )
                        })}</select>
                </div>



                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </Wrapper>
    );
};

export default UsersCreate;