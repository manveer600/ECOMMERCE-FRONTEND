import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuthAsync } from "../authSlice";
import { fetchItemsByUserIdAsync } from "../../cart/CartSlice";
import { fetchOrdersByUserAsync } from "../../order/orderSlice";
import { fetchAllBrandsAsync, fetchAllCategoriesAsync, fetchAllProductsAsync } from "../../product/productSlice";
import Spinner from "../../common/Spinner/spinner.js";
function Protected({ children }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state?.auth?.loggedInUserToken);
    console.log('token found in protected', token);
    const [isLoading, setIsLoading] = useState(true);

    useEffect((state) => {
        async function instant() {
            const previousUser = await dispatch(checkAuthAsync());
            if (previousUser?.payload?.success) {
                await dispatch(fetchAllProductsAsync());
                await dispatch(fetchAllProductsAsync());
                await dispatch(fetchAllBrandsAsync());
                await dispatch(fetchAllCategoriesAsync());
                await dispatch(fetchOrdersByUserAsync());
                await dispatch(fetchItemsByUserIdAsync());
            }
            setIsLoading(false);
        }
        instant();
    }, [token])

    if (isLoading) {
        return <Spinner/>
    }
    if (!token) {
        console.log('token not found in protected');
        return <Navigate to='/login' replace={true} />
    } else if (token) return children;
}

export default Protected;