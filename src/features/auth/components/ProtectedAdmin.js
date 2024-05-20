import { Navigate } from "react-router-dom";
import { checkAuthAsync, loggedInUserToken, userInfo } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../../common/Spinner/spinner";
function ProtectedAdmin({ children }) {
    const token = useSelector(loggedInUserToken)
    const user = useSelector(userInfo);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    useEffect(() => {
        (async function () {
            const response = await dispatch(checkAuthAsync());
            if(!response?.payload?.success){
                setRedirectToLogin(true);
            }
            setIsLoading(false);
        })();
    }, [dispatch,token])

    if (isLoading) {
        <Spinner />
    }

    if (!token || user.role !== 'admin' || redirectToLogin) {
        return <Navigate to='/login' replace={true} />
    }
    return children;
}

export default ProtectedAdmin;