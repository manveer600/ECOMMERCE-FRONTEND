import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuthAsync, loggedInUserToken } from "../authSlice";
import Loader from "../../common/Spinner/Loader.js";
import { fetchItemsByUserIdAsync } from "../../cart/CartSlice.js";
function Protected({ children }) {
    const dispatch = useDispatch();
    const token = useSelector(loggedInUserToken);
    const [isLoading, setIsLoading] = useState(true);
    const [redirectToLogin, setRedirectToLogin] = useState(false);


    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const previousUser = await dispatch(checkAuthAsync());
            setIsLoading(false);
            if (previousUser?.payload?.success) {
                await dispatch(fetchItemsByUserIdAsync());
            } else if (!previousUser?.payload?.success) setRedirectToLogin(true);
        })()
    }, [dispatch, token])

    if (isLoading) {
        return <Loader />
    }
    if (!token || redirectToLogin) {
        return <Navigate to='/login' replace={true} />
    }

    return children;
}

export default Protected;