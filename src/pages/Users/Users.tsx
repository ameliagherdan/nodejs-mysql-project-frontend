/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../models/users";
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, SetUsers] = useState([]);
    const [page, SetPage] = useState(1);
    const [lastPage, SetLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`users?page=${page}`, { withCredentials: true })
                SetUsers(data.data);
                SetLastPage(data.meta.data.last_page)
            }
        )()
    }, [page]);

    const next = () => {
        if (page < lastPage) {
            SetPage(page + 1)
        }
    }

    const prev = () => {
        if (page >= 1) {
            SetPage(page - 1)
        }
    }

    const del = async (id: number) => {
        if (window.confirm('Are you sure that you want to delete this entry?')) {
            await axios.delete(`users/${id}`, { withCredentials: true })

            SetUsers(users.filter((u: User) => u.id !== id));
        }
    }
    return (
        <Wrapper>
            <div className='pt-3 pb-2 mb-3 border-bottom'>
                <Link to={'/users/create'} className="btn btn-primary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.name}</td>
                                    <td>
                                        <div>
                                            <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-outline-secondary"
                                            >Edit</Link>
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => { del(user.id) }}>Delete</a>

                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <nav>
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#" onClick={prev}>Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#" onClick={next}>Next</a></li>
                </ul>
            </nav>
        </Wrapper >
    );
}

export default Users;