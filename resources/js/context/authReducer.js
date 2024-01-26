import { types } from "../types/type";

export const authReducer = (state, action) => {
    
    switch (action.type) {
        case types.login:
            return {
                ...state,
                isAuthenticated: true,
                user:action.payload
            };
        
        case types.logout:
            return {
                ...state,
                isAuthenticated:false,
                user:null
            };
        
        default:
            return state;
    }
}