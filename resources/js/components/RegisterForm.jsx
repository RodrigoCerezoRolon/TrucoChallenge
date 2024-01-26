import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import { AuthContext } from '../context';
import axios from 'axios';

const RegisterForm = () => {
    const { authState } = useContext(AuthContext);
    const [formError, setFormError] = useState(false);
    const [errorList, setErrorList] = useState();
    const [userCreated,setUserCreated]= useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profile_id: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8000/api/auth/register',
                formData,
                {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${authState.user.access_token}`,
                    },
                }
            );

            const user = response.data;
            setFormError(false);
            setUserCreated(true);
            setFormData({
                name: '',
                email: '',
                password: '',
                profile_id: ''
            });
            setTimeout(()=>{setUserCreated(false)},1000)
            console.log(user);


        } catch (error) {
            console.log(error);
            setFormError(true);
            let newErrorList = [];
            if(error.response.status==422){
                
                for (const [fieldName, fieldErrors] of Object.entries(error.response.data.errors)) {
                    // Construir la lista de errores para cada campo
                    const errorItems = fieldErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ));
    
                    // Agregar a la lista principal
                    newErrorList.push(
                        <div key={fieldName}>
                            <ul>{errorItems}</ul>
                        </div>
                    );
                }
                setErrorList(newErrorList);
            }
            if(error.response.status==500){
                newErrorList.push(
                    <div key={'error'}>
                       <li key={1}>'Error al guardar'</li>
                    </div>
                );
                setErrorList(newErrorList);
            }
           
            console.log("Error al guardar", newErrorList);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <Navbar user={authState.user}></Navbar>
            </div>
            <div className="container">
                <div className="row justify-content-center py-5">
                    <div className="col-md-8">
                        <div className={`alert alert-danger ${formError ? '' : 'd-none'}`} role="alert">
                            {errorList}
                        </div>
                        <div className={`alert alert-success ${userCreated ? '' : 'd-none'}`} role="alert">
                            Usuario Creado
                        </div>
                        <div className="card">
                            <div className="card-header">Registrar usuario</div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row mb-3">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Nombre</label>
                                        <div className="col-md-6">
                                            <input
                                                id="name"
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}

                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email</label>
                                        <div className="col-md-6">
                                            <input
                                                id="email"
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}

                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Contraseña</label>
                                        <div className="col-md-6">
                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="profile" className="col-md-4 col-form-label text-md-end">Perfil</label>
                                        <div className="col-md-6">
                                            <select
                                                id="profile"
                                                className="form-control"
                                                name="profile_id"
                                                value={formData.profile_id}
                                                onChange={handleChange}
                                                
                                            >
                                                <option value='' default disabled>Seleccione un Perfil</option>
                                                <option value="1">Jugador</option>
                                                <option value="2">Administrador</option>
                                                <option value="3">Consultor</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div className="row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Registrar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default RegisterForm;
