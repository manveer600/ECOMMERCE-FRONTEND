import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { discountedPrice } from "../../../app/constants";
function UserOrder() {
    const orders = useSelector((state) => state?.orders?.orders);
    const navigate = useNavigate();

    const totalItems = orders.reduce((total, order) => total + order.items.reduce((subTotal, item) => subTotal + item.quantity, 0), 0);
    // useEffect(() => {
    //     async function fetchingOrders() {
    //         await dispatch(fetchOrdersByUserAsync());
    //     }

    //     fetchingOrders();
    // }, [dispatch])
    return (
        <div>
            <p className="text-center font-serif underline text-yellow-800  text-6xl pt-3 ">MY ORDERS</p>
            {
                orders && orders[0] ? orders.map((order) => (
                    <div className="mx-auto mt-10 z-10 overflow-x-hidden bg-white max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div className="mt-8">
                            <h2 className="text-4xl font-serif font-bold text-blue-700 underline ">Order #{order.id}</h2>
                            <h4 className="text-xl font-serif font-bold text-red-600 ">Order Status : {order.status}</h4>
                            <div className="flow-root">
                                <ul role="list" className="-my-6 p-5 divide-y divide-gray-200">
                                    {
                                        order.items && order.items.map((item) => (
                                            <li key={item.id} className="text-black flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.productId.thumbnail}
                                                        alt={item.productId.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={item.productId.title}>{item.productId.title}</a>
                                                            </h3>
                                                            <p className="ml-4">${discountedPrice(item.productId) * item.quantity}</p>
                                                        </div>
                                                        <p className="text-end line-through">${item.productId.price}</p>
                                                        <p className="mt-1 text-sm text-gray-500">Stock Available: {item.productId.stock - item.quantity}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className=" text-black font-bold ">Qty:{item.quantity}</div>
                                                    </div>

                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>

                                <p className="text-xl font-serif mt-4 font-bold">Shipping Addresses :</p>


                                {
                                    order.selectedAddress[0] && order.selectedAddress.map((address) => {
                                        return (
                                            <li className=" border-2 p-3 flex justify-between  gap-x-6 py-5">
                                                <div className="flex min-w-0 gap-x-4">
                                                    <div className="min-w-0  flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.address}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.email}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.postalCode}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">{address.state}</p>
                                                    <p className="text-sm leading-6 text-gray-900">Phone: {address.phoneNumber}</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }

                            </div>
                        </div>



                        {order.totalAmount > 0 ? (<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>
                                    ${order.totalAmount}
                                </p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total Items</p>
                                <p>
                                    {totalItems} items
                                </p>
                            </div>


                            {/* <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>

                                    <Link to='/'>
                                        <button
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            onClick={() => navigate('/')}
                                        >
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </Link>

                                </p>
                            </div> */}
                        </div>) : <div className="flex flex-col justify-start items-start mt-2">OOPS ! You haven't ordered anything
                            <button className="font-serif mt-2 bg-gray-200 px-2 py-1 hover:text-yellow-900 rounded-sm" onClick={() => navigate('/')}>See Items</button>
                        </div>}


                    </div>

                )) : (
                    <div>
                        <p className="text-5xl text-red-500 text-center font-serif mt-10">OOPS!!😌 No orders found.</p>
                        <Link to='/cart'>
                            <p className="text-2xl text-black underline hover:cursor-pointer hover:text-green-800 text-center font-serif mt-10">Order now? </p>
                        </Link>
                    </div>
                )
            }

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>

                    <Link to='/'>
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => navigate('/')}
                        >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </Link>

                </p>
            </div>

        </div>
    );
}

export default UserOrder;