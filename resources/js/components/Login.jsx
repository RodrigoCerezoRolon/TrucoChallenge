import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loginStarted, setLoginStarted] = useState(false);
    const [logged,setLogged]= useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginStarted(true);
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                email,
                password,
            });
            const user = response.data; // Asegúrate de adaptar esto según tu API
            login(user);
            setLogged(true);
            setLoginStarted(false);
            setTimeout(()=>{ navigate('/dashboard');},500)
           
        } catch (error) {
           
            console.log("Error al iniciar sesion", error);
        }

    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className={`alert alert-success ${logged ? '' : 'd-none'}`} role="alert">
                    Credenciales validadas
                    </div>
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">
                                        Correo
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            autoComplete="email"
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-end">
                                        Contraseña
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            id="password"
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            autoComplete="current-password"
                                        />
                                    </div>
                                </div>

                                <div className="row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" className={`btn btn-primary ${loginStarted ? 'd-none' : ''}`}>
                                            Iniciar Sesion
                                        </button>
                                        <button id='#loadingButton' className={`btn btn-primary ${loginStarted ? '' : 'd-none'}`} type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span role="status">Iniciando sesi&oacute;n...</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
