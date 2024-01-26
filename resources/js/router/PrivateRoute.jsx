import { useContext } from "react"
import { AuthContext } from "../context"
import { Navigate, Outlet } from "react-router-dom";


export const PrivateRoute = ({children})=>{
    
    const {authState}= useContext(AuthContext);
    return (authState.isAuthenticated) ?   <Outlet /> : <Navigate to={'/login'}></Navigate>
}