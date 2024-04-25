import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {loggedInUserToken } from "../authSlice";
function Protected({children}) {
    const token = useSelector(loggedInUserToken);
    if(!token){
        return <Navigate to='/login'/>
    }
    return children;
}

export default Protected;