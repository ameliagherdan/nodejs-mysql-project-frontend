import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Permission } from '../../models/permissions';

const RolesCreate = () => {
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('permissions', { withCredentials: true });
                setPermissions(data);
            }
        )()
    }, [])


    const check = (id: number) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }

        setSelected([...selected, id]);
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('roles', {
            name,
            permissions: selected
        }, { withCredentials: true });
        setRedirect(true);
    }

    if (redirect) {
        return (
            <Navigate to="/roles" />)
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Create Role</h1>

                <div className='mb-3'>
                    <input className="form-control" placeholder="Name" required
                        onChange={e => setName(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {permissions.map((p: Permission) => {
                            return (
                                <div className="form-check form-check-inline col-3" key={p.id}>
                                    <input className="form-check-input" type="checkbox"
                                        value={p.id}
                                        onChange={() => check(p.id)} />
                                    <label className="form-check-label">{p.name}</label>
                                </div>
                            )
                        })}

                    </div>

                </div>


                <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>
            </form>
        </Wrapper>
    );
};

export default RolesCreate;