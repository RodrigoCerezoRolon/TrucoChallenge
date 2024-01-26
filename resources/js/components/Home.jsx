import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

export const Home = ()=>{
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className='col-md-12'>
                    <img className='img-fluid mx-auto d-block' src='logotruco.png'></img>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header text-center bg-dark text-white">Bienvenido al sistema de estadisticas de truco</div>

                        <div className="card-body d-flex flex-column justify-content-center align-items-center">Inicie sesion para ver las estadisticas de los partidos
                        
                        <Link className='btn btn-primary my-3' to={'/login'} >Login</Link>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}