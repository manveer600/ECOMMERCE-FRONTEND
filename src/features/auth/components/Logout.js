import { useEffect } from "react";
import { loggedInUserToken, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function Logout() {
    const dispatch = useDispatch();
    const token = useSelector(loggedInUserToken);
    useEffect(() => {
        dispatch(signOutAsync());
    }, [dispatch])
    return (
        <div>
            {
                !token && <Navigate to='/login' replace={true} />
            }
        </div>

    );
}

export default Logout;