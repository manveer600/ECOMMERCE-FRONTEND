import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuthAsync, loggedInUserToken } from "../authSlice";
import Spinner from "../../common/Spinner/spinner.js";
import { fetchItemsByUserIdAsync } from "../../cart/CartSlice.js";
function Protected({ children }) {
    const dispatch = useDispatch();
    const token = useSelector(loggedInUserToken);
    const [isLoading, setIsLoading] = useState(true);
    const [redirectToLogin, setRedirectToLogin] = useState(false);


    useEffect(() => {
        async function instant() {
            const previousUser = await dispatch(checkAuthAsync());
            if (previousUser?.payload?.success) {
                await dispatch(fetchItemsByUserIdAsync());
            } else if (!previousUser?.payload?.success) setRedirectToLogin(true);
            setIsLoading(false);
        }
        instant();
    }, [dispatch, token])

    if (isLoading) {
        return <Spinner />
    }
    if (!token || redirectToLogin) {
        return <Navigate to='/login' replace={true} />
    }
    return children;
}

export default Protected;