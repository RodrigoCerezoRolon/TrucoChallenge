import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { AppRouter } from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context';

function App() {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className='col-md-12'>
                    <img className='img-fluid mx-auto d-block' src='logotruco.png'></img>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Welcome</div>

                        <div className="card-body">I'm an App component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
           
        </BrowserRouter>
    </React.StrictMode>
);