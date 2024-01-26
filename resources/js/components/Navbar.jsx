import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context';
import 'bootstrap/dist/css/bootstrap.css';
const Navbar = ({ user }) => {
    const { profile_id, name } = user;
    const { logout } = useContext(AuthContext);
    const onLogOut = () => {
        logout();
        Navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <a className="navbar-brand">
                    Truco API
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left Side Of Navbar */}
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item dropdown">
                            <Link className='nav-link' to={'/reports'}>Reportes</Link>

                        </li>
                        {profile_id == 2 ? (
                            <>
                                <li className="nav-item dropdown">
                                    <Link className='nav-link' to={'/register'}>Alta Usuario</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className='nav-link' to={'/game'}>Registrar Partida</Link>
                                </li>
                            </>

                        ) : ''}

                    </ul>

                    {/* Right Side Of Navbar */}
                    <ul className="navbar-nav ms-auto">
                        {/* Authentication Links */}

                        <li className="nav-item dropdown">
                            <a
                                id="navbarDropdown"
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {name}
                            </a>

                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a
                                    className="dropdown-item"
                                    href="/logout"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onLogOut()
                                    }}
                                >
                                    Logout
                                </a>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
