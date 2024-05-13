import { Link, useParams } from "react-router-dom";
import ReactConfetti from "react-confetti";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCartAsync } from "../features/cart/CartSlice";
import { resetOrder } from "../features/order/orderSlice";
import { checkAuthAsync } from "../features/auth/authSlice";
export default function OrderSuccessPage() {
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;


    useEffect(() => {
        (async () => {
            await dispatch(checkAuthAsync());
        })()
    }, [dispatch])

    useEffect(() => {

        async function instant() {
            await dispatch(resetCartAsync());
            // reset current order
            await dispatch(resetOrder());
        }
        instant();
    }, [dispatch])

    return (
        <>
            <ReactConfetti className=" h-full w-full" />

            {params?.id ?  <main className="grid min-h-screen place-items-center bg-white w-full">
                <div className="text-center">
                    <p className="px-4 text-center text-4xl sm:text-6xl font-semibold text-indigo-600 ">Congratulations😁</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order Id #{id}</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600 mx-3">Your order has been successfully placed.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to='/'
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Order More
                        </Link>
                        <Link to="/contact" className="text-sm font-semibold text-gray-900">
                            Contact Us <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </main> : <h1>loading</h1>}
        </>
    )
}