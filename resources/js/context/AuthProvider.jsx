import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer"
import { types } from "../types/type"

const initialState = {
    isAuthenticated:false
}
const init = ()=>{
    const user= JSON.parse(localStorage.getItem('user'));
    return {
        isAuthenticated: !!user,
        user:user
    }
}
export const AuthProvider = ({children}) =>{

    const [authState,dispatch]=useReducer(authReducer,initialState,init);
    const login = (user) => {
        localStorage.setItem('user',JSON.stringify(user));
        dispatch({ type: types.login, payload: user });
    };
    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: types.logout });
    };
    return (
        <AuthContext.Provider value={{authState,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}