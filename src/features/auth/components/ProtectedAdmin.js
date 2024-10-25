import { Navigate } from "react-router-dom";
import { checkAuthAsync, loggedInUserToken } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../../common/Spinner/Loader";
function ProtectedAdmin({ children }) {
    const dispatch = useDispatch();
    const { loggedInUserToken, userInfo } = useSelector((state) => state?.auth)

    const [isLoading, setIsLoading] = useState(true);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    // useEffect(() => {
    //     (async function () {
    //         setIsLoading(true);
    //         const previousUser = await dispatch(checkAuthAsync());
    //         setIsLoading(false);
    //         console.log('previousUser', previousUser);
    //         if (!previousUser?.payload?.success) {
    //             setRedirectToLogin(true);
    //         }
    //     })();
    // }, [dispatch, loggedInUserToken, userInfo])

    useEffect(() => {
        async function checkAuth() {
            const previousUser = await dispatch(checkAuthAsync());
            setIsLoading(false);
            console.log('previousUser', previousUser);
            if (!previousUser?.payload?.success) {
                setRedirectToLogin(true);
            }
        }

        checkAuth();
    }, [dispatch]);

    if (isLoading) {
        return <Loader />
    }

    if (!loggedInUserToken || userInfo.role !== 'admin' || redirectToLogin) {
        return <Navigate to='/login' replace={true} />
    }

    return children;

}

export default ProtectedAdmin;