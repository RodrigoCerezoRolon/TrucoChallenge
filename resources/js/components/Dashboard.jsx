import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';
import { AuthContext } from '../context';

const Dashboard = () => {
    const { logout, authState } = useContext(AuthContext);
    return (
        <>
            <div className="container-fluid">
                <Navbar user={authState.user}></Navbar>
            </div>
            <div className='container'>
                <div className='row py-5'>
                    <div className='col-md-12 text-center'>
                    <h1>Bienvenido {authState.user.name}</h1>
                    </div>
                   
                </div>
            </div>
        </>

    );
};

export default Dashboard;
