import { useState } from "react";
import { useEffect } from "react";
import { discountedPrice } from '../../../app/constants.js'
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAsync, selectTotalOrders, updateOrderAsync } from "../../order/orderSlice";
// import { Pagination } from "../../common/Pagination.js";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { Pagination } from "../../common/Pagination.js";
function AdminOrders() {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    const totalOrders = useSelector((state) => state.orders.totalOrders);
    const [sort, setSort] = useState({});
    const [editableOrderId, setEditableOrderId] = useState(-1);

    function handleEdit(order) {
        setEditableOrderId(order.id);
    }

    async function handleUpdate(e, order) {
        console.log('Initially the order is', order);
        const updatedOrder = { ...order, status: e.target.value }
        console.log('updated order is this', updatedOrder);
        const response = await dispatch(updateOrderAsync(updatedOrder));
        console.log('response after updating order', response);
        setEditableOrderId(-1);
    }

    function chooseColour(status) {
        switch (status) {
            case 'pending':
                return `bg-purple-200 text-purple-600`;
            case 'dispatched':
                return `bg-yellow-200 text-yellow-600`;
            case 'delivered':
                return `bg-green-200 text-green-600`;
            case 'cancelled':
                return `bg-red-200 text-red-600`;
            default:
                return `bg-red-200 text-red-600`;
        }
    }

    function handlePage(page) {
        setPage(page);
    }

    async function handleSorting(sortOption) {
        const sort = { sort: sortOption.sort, order: sortOption.order }
        setSort(sort);
    }


    useEffect(() => {
        (async function () {
            const pagination = { page: page, limit: 10 }
            await dispatch(fetchAllOrdersAsync({ sort, pagination }));
        }
        )()
    }, [dispatch, page, sort])

    return (
        <>
            {/* component */}
            <div>
                <div className="min-h-screen bg-white overflow-auto flex items-center justify-center  font-sans ">
                    <div className="w-full lg:w-6/6">
                        <div className="  w-full rounded my-6">
                            {orders && orders.length > 0 ? <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left hover:cursor-pointer"
                                            onClick={(e) => handleSorting({ sort: '_id', order: sort?.order === 'asc' ? 'desc' : 'asc' })}>
                                            Order#
                                            {
                                                sort.sort === '_id' && sort.order === 'asc' ? <ArrowUpIcon className="h-6 w-6 inline" /> : <ArrowDownIcon className="h-6 w-6 inline" />
                                            }

                                        </th>
                                        <th className="py-3 px-6 text-left">Items</th>
                                        <th className="py-3 px-6 text-center hover:cursor-pointer" onClick={e => handleSorting({ sort: 'totalAmount', order: sort?.order === 'asc' ? 'desc' : 'asc' })}>
                                            Total Amount
                                            {sort.sort === 'totalAmount' && sort.order === 'asc' ? <ArrowUpIcon className="h-6 w-6 inline" /> :
                                                <ArrowDownIcon className="h-6 w-6 inline" />}
                                        </th>
                                        <th className="py-3 px-6 text-center">Shipping Addresses</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="text-gray-600 text-sm font-light">
                                    {
                                        orders.length > 0 && orders.map((order, index) => (
                                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6 border-2 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="font-medium">{order.id}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 border-2 text-left">
                                                    {order.items.map((item, index) => (
                                                        <div key={index} className="flex items-center">
                                                            <div className="mr-2">
                                                                <img
                                                                    className="w-6 h-6 rounded-full"
                                                                    src={item.productId.thumbnail}
                                                                />
                                                            </div>
                                                            <span className="font-bold">
                                                                {item.productId.title}
                                                            </span>
                                                            &nbsp; &nbsp;#{item.quantity} &nbsp;&nbsp;  ${discountedPrice(item.productId)}
                                                        </div>
                                                    ))}

                                                </td>
                                                <td className="py-3 px-6 border-2 text-center">
                                                    <div className="flex font-bold items-center justify-center">
                                                        {order.totalAmount}$
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 border-2 text-center">
                                                    {/* {
                                                    order.selectedAddress.map((selectedAddress, index) => {
                                                        return(<div>
                                                            <div><strong>{order.selectedAddress.name},</strong></div>
                                                            <div> <strong>{order.selectedAddress.email},</strong></div>
                                                            <div><strong>{order.selectedAddress.phoneNumber},</strong></div>
                                                            <div> {order.selectedAddress.address},</div>
                                                            <div>{order.selectedAddress.city},</div>
                                                            <div>{order.selectedAddress.postalCode},</div>
                                                        </div>)
                                                    })
                                                } */}

                                                    <div><strong>{order.selectedAddress[0].name},</strong></div>
                                                    <div> <strong>{order.selectedAddress[0].email},</strong></div>
                                                    <div><strong>{order.selectedAddress[0].phoneNumber},</strong></div>
                                                    <div> {order.selectedAddress[0].address},</div>
                                                    <div>{order.selectedAddress[0].city},</div>
                                                    <div>{order.selectedAddress[0].postalCode},</div>
                                                </td>
                                                <td className="py-3 px-6 border-2 text-center">
                                                    {editableOrderId === order.id ?
                                                        (
                                                            <select onChange={e => handleUpdate(e, order)}>
                                                                <option value='pending'>Pending</option>
                                                                <option value='dispatched'>Dispatched</option>
                                                                <option value='delivered'>Delivered</option>
                                                                <option value='cancelled'>Cancelled</option>
                                                            </select>
                                                        )
                                                        :
                                                        (
                                                            <span className={`${chooseColour(order.status)} py-1 px-3 rounded-full text-xs`}>
                                                                {order.status}
                                                            </span>
                                                        )

                                                    }
                                                </td>
                                                <td className="py-3 px-6  text-center">
                                                    <div className="flex item-center justify-center">
                                                        <div onClick={e => handleEdit(order)} className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110 ">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                />
                                                            </svg>
                                                        </div>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table> : <div className="font-serif flex items-center justify-center md:text-3xl">No orders found from your customers.</div>}
                        </div>
                    </div>
                </div>
                <Pagination page={page} totalItems={totalOrders} setPage={setPage} handlePage={handlePage}></Pagination>

            </div>
        </>

    )
}

export default AdminOrders;