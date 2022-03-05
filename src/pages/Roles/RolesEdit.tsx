import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { Permission } from '../../models/permissions';

const RolesEdit = (props: any) => {
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams()

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('permissions', { withCredentials: true });
                setPermissions(response.data);


                const { data } = await axios.get(`roles/${id}`, { withCredentials: true });

                setName(data.name)
                setSelected(data.permissions.map((p: Permission) => p.id))
            }
        )()
    }, [id])


    const check = (id: number) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }

        setSelected([...selected, id]);
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`roles/${id}`, {
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
                <h1 className="h3 mb-3 fw-normal">Edit a Role</h1>

                <div className='mb-3'>
                    <input className="form-control" placeholder="Name" required
                        defaultValue={name}
                        onChange={e => setName(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {permissions.map((p: Permission) => {
                            return (
                                <div className="form-check form-check-inline col-3" key={p.id}>
                                    <input className="form-check-input" type="checkbox"
                                        checked={selected.some(s => s === p.id)}
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

export default RolesEdit;