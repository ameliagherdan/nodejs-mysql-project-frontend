import React from 'react';
import './App.css';
import Users from "./pages/Users/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UsersCreate from './pages/Users/UsersCreate';
import UsersEdit from './pages/Users/UsersEdit';
import Roles from './pages/Roles/Roles';
import RolesCreate from './pages/Roles/RolesCreate';
import RolesEdit from './pages/Roles/RolesEdit';
import Products from './pages/Products/Products';
import ProductsCreate from './pages/Products/ProductsCreate';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/create" element={<UsersCreate />} />
                    <Route path="/users/:id/edit" element={<UsersEdit />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/roles/create" element={<RolesCreate />} />
                    <Route path="/roles/:id/edit" element={<RolesEdit />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/create" element={<ProductsCreate />} />
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
