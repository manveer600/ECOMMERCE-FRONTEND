import { Navigate } from "react-router-dom";
import { loggedInUserToken, userInfo } from "../authSlice";
import { useSelector } from "react-redux";
function ProtectedAdmin({children}) {
    const token = useSelector(loggedInUserToken)
    const user = useSelector(userInfo);
    if(!token){
        return <Navigate to='/login' replace={true}/>
    }
    if(token && user.role !== 'admin'){
        return <Navigate to='/login' replace={true}/>
    }
    return children;
}

export default ProtectedAdmin;