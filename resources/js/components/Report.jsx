import { useContext, useState } from "react";
import Navbar from "./Navbar";
import { AuthContext } from "../context";


const Report = () => {
    const { logout, authState } = useContext(AuthContext);
    const [formError, setFormError] = useState(false);
    const [errorList, setErrorList] = useState();
    const [userSearched, setUserSearched] = useState();
    const [searchStarted, setSearchStarted] = useState(false);
    const [report, setReport] = useState();
    const [formData, setFormData] = useState({
        start_date: '',
        finish_date: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(false);
       
        try {
            setSearchStarted(true);
            const response = await axios.post(
                'http://localhost:8000/api/auth/report',
                formData,
                {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${authState.user.access_token}`,
                    },
                }
            );

            setReport(response.data.report);
            setUserSearched(response.data.user);
            setFormError(false);
            setSearchStarted(false);
            //console.log(report);


        } catch (error) {
            setFormError(true);
            setSearchStarted(false);
            let newErrorList = [];
            if (error.response.status == 422) {

                for (const [fieldName, fieldErrors] of Object.entries(error.response.data.errors)) {

                    const errorItems = fieldErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ));


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
                        <li key={1}>'Error al consultar'</li>
                    </div>
                );
                setErrorList(newErrorList);
            }

            console.log("Error al consultar", newErrorList);
        }
    };
    return (
        <>
            <div className="container-fluid">
                <Navbar user={authState.user}></Navbar>
            </div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12 my-2">
                        <h1> Reportes de Partidas</h1>
                    </div>
                    <div className="col-md-12">
                        <div className={`alert alert-danger ${formError ? '' : 'd-none'}`} role="alert">
                            {errorList}
                        </div>
                        <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={handleSubmit}>

                            <div className="col-4">

                                <div className="input-group">

                                    <input type="date" className="form-control" id="inlineFormInputGroupUsername" placeholder="Fecha Desde" name="start_date" onChange={handleChange} value={formData.start_date} />
                                </div>
                            </div>
                            <div className="col-4">

                                <div className="input-group">

                                    <input type="date" className="form-control" id="inlineFormInputGroupUsername" placeholder="Fecha Hasta" name="finish_date" onChange={handleChange} value={formData.finish_date} />
                                </div>
                            </div>
                            {authState.user.profile_id != 1 ? (
                                <div className="col-4">

                                    <div className="input-group">

                                        <input type="email" className="form-control" id="inlineFormInputGroupUsername" placeholder="Email del Jugador" name="email" onChange={handleChange} value={formData.email} />
                                    </div>
                                </div>
                            ) : ''}
                            <div className="col-12">
                                <button type="submit" className={`btn btn-primary ${searchStarted ? 'd-none' : ''}`}>Buscar</button>
                                <button id='#loadingButton' className={`btn btn-primary ${searchStarted ? '' : 'd-none'}`} type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span role="status">Buscando...</span>
                                        </button>
                            </div>
                        </form>
                    </div>
                </div>
                {report && report.length > 0 ? (
                    <table className="table table-bordered my-5">
                        <thead>
                            <tr>
                                <th>Jugador</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Finalización</th>
                                <th>Puntos</th>
                                <th>Ganó el partido</th>
                                <th>Cantidad de Envidos cantados y ganados</th>
                                <th>Cantidad de Flores Cantadas y ganadas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.map((reportItem, index) => (
                                <tr key={index}>
                                    <td>{userSearched ? userSearched.name : authState.user.name}</td>
                                    <td>{reportItem.start_date}</td>
                                    <td>{reportItem.finish_date}</td>
                                    <td>{reportItem.points}</td>
                                    <td>{reportItem.is_winner ? 'Si' : 'No'}</td>
                                    <td>{reportItem.amount_envido}</td>
                                    <td>{reportItem.amount_flower}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : ''}
                {report && report.length == 0 ? (
                    <div className="col-md-12 text-center my-5">
                        <h3>No hay registros</h3>
                    </div>
                ) : ''}
            </div>

        </>
    )
}

export default Report;