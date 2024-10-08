import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuthAsync, loggedInUserToken } from "../authSlice";
import Loader from "../../common/Spinner/Loader.js";
import { fetchItemsByUserIdAsync } from "../../cart/CartSlice.js";
import toast from "react-hot-toast";
// CONCEPT: Basically agr user ne screen navigate krli ya fir screen band krdi toh obv hamara component dom se hat jayega(unmount ho jayaega, basically  return () => {isMounted = false;}; y call ho jayega) and agr component unmount hogya means vo dom me hai hi nhi toh uspe koi bhi operation krne ka koi mtlb ni bante toh us case kuch mat kro, but agr component mounted hai means user wait kr rha hai 1 specific task complete hone ka, ya fir user ne screen navigate nhi kri toh us case me hum saari cheezen krenge jo hum krna chaha rhe the
function Protected({ children }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state?.auth?.loggedInUserToken);

    const [isLoading, setIsLoading] = useState(true);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function checkAuth() {
            setIsLoading(true);
            try {
                const previousUser = await dispatch(checkAuthAsync());
                if (isMounted) {
                    setIsLoading(false);
                    if (previousUser?.payload?.success) {
                        await dispatch(fetchItemsByUserIdAsync());
                    } else {
                        setRedirectToLogin(true);
                    }
                }
            } catch (error) {
                console.error("Auth check failed: ", error);
                if (isMounted) {
                    setRedirectToLogin(true);
                }
                return toast.error('We are unable to process your request right now, Please try later', {
                    id: 'errorGettingAuth',
                    duration: 2000
                })

            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        checkAuth();

        return () => {
            isMounted = false; // Cleanup: set flag to false when component unmounts
        };
    }, [dispatch]);

    if (isLoading) {
        return <Loader />
    }
    
    if (!token || redirectToLogin) {
        return <Navigate to='/login' replace={true} />
    }

    return children;
}

export default Protected;