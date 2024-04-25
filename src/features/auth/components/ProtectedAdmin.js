import { Navigate } from "react-router-dom";
import { loggedInUserToken, userInfo } from "../authSlice";
import { useSelector } from "react-redux";
function ProtectedAdmin({children}) {
    const token = useSelector(loggedInUserToken)
    const user = useSelector(userInfo);
    if(!token){
        return <Navigate to='/login'/>
    }
    if(token && user.role !== 'admin'){
        return <Navigate to='/login'/>
    }
    return children;
}

export default ProtectedAdmin;