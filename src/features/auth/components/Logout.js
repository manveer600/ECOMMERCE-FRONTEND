import { useEffect } from "react";
import { loggedInUserToken, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function Logout() {
    const dispatch = useDispatch();
    const token = useSelector(loggedInUserToken);
    useEffect(() => {
        dispatch(signOutAsync());
    }, [])
    return (
        <div>
            {
                !token && <Navigate to='/login' />
            }
        </div>

    );
}

export default Logout;