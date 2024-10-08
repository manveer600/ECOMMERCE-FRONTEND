import { Navigate } from "react-router-dom";
import { checkAuthAsync, loggedInUserToken, userInfo } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import Spinner from "../../common/Spinner/spinner";
import Loader from "../../common/Spinner/Loader";
function ProtectedAdmin({ children }) {
    const dispatch = useDispatch();
    
    const token = useSelector(loggedInUserToken)
    const user = useSelector(userInfo);
    
    const [isLoading, setIsLoading] = useState(true);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    useEffect(() => {
        (async function () {
            const response = await dispatch(checkAuthAsync());
            console.log('response', response);
            if(!response?.payload?.success){
                setRedirectToLogin(true);
            }
            setIsLoading(false);
        })();
    }, [dispatch,token])

    if (isLoading) {
        <Loader />
    }

    if (!token || user.role !== 'admin' || redirectToLogin) {
        return <Navigate to='/login' replace={true} />
    }
    return children;
}

export default ProtectedAdmin;