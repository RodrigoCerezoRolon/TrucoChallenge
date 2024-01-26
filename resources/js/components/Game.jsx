import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { AuthContext } from '../context';
import 'bootstrap/dist/css/bootstrap.css';

const Game = () => {
    const { authState } = useContext(AuthContext);
    const [formError, setFormError] = useState(false);
    const [errorList, setErrorList] = useState();
    const [gameCreated, setGameCreated] = useState(false);
    const [players, setPlayers] = useState({});
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        player_id: '',
        start_date: '',
        finish_date: '',
        points: '',
        is_winner: '',
        amount_envido: '',
        amount_flower: '',
    });
    useEffect(() => {
        axios.get('http://localhost:8000/api/auth/players',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.user.access_token}`,
                }
            })
            .then(response => {
                console.log(response)
                setPlayers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener la lista de jugadores:', error);
                setLoading(false);
            });
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8000/api/auth/games',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authState.user.access_token}`,
                    },
                }
            );
            const game = response.data;
            setFormError(false);
            setGameCreated(true);
            setFormData({
                player_id: '',
                start_date: '',
                finish_date: '',
                points: '',
                is_winner: '',
                amount_envido: '',
                amount_flower: '',
            });
            console.log('Respuesta del servidor:', game);
        } catch (error) {
            console.log(error);
            setFormError(true);
            let newErrorList = [];
            if (error.response.status == 422) {

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
            if (error.response.status == 500) {
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
    if (loading) {
        return <p>Cargando...</p>;
    }
    return (
        <>
            <div className="container-fluid">
                <Navbar user={authState.user}></Navbar>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className={`alert alert-danger ${formError ? '' : 'd-none'}`} role="alert">
                        {errorList}
                    </div>
                    <div className={`alert alert-success ${gameCreated ? '' : 'd-none'}`} role="alert">
                        Partida Creada
                    </div>
                </div>
            </div>
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="player_id" className="form-label">ID del Jugador:</label>
                                <select
                                    className="form-select"
                                    id="player_id"
                                    name="player_id"
                                    value={formData.player_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un jugador</option>
                                    {players.map(player => (
                                        <option key={player.id} value={player.id}>{player.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="start_date" className="form-label">Fecha de Inicio:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="start_date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="finish_date" className="form-label">Fecha de Finalización:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="finish_date"
                                    name="finish_date"
                                    value={formData.finish_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="points" className="form-label">Puntos:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="points"
                                    name="points"
                                    value={formData.points}
                                    onChange={handleChange}
                                    min={0}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="is_winner" className="form-label">Resultado del partido:</label>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="ganador"
                                        name="is_winner"
                                        value="1"  // Cambié el valor a "1" para representar la opción de ganador
                                        checked={formData.is_winner === "1"}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="ganador">
                                        Ganador
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        id="perdedor"
                                        name="is_winner"
                                        value="0"  // Cambié el valor a "0" para representar la opción de perdedor
                                        checked={formData.is_winner === "0"}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="perdedor">
                                        Perdedor
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="amount_envido" className="form-label">Cantidad de Envido:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount_envido"
                                    name="amount_envido"
                                    value={formData.amount_envido}
                                    onChange={handleChange}
                                    min={0}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="amount_flower" className="form-label">Cantidad de Flores:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount_flower"
                                    name="amount_flower"
                                    value={formData.amount_flower}
                                    onChange={handleChange}
                                    min={0}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </>

    );
};

export default Game;
