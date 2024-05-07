import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteItemFromCartAsync, fetchItemsByUserIdAsync, updateItemAsync } from "./CartSlice";
import { discountedPrice } from "../../app/constants";
// import { addOrderAsync } from "../order/orderSlice";




function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state?.cart?.items);
  const [open, setOpen] = useState(true)
  const totalAmount = items.reduce((amount, item) => discountedPrice(item.productId) * item.quantity + amount, 0);
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  function handleQuantity(e, item) {
    if (e.target.value <= item.stock) {
      dispatch(updateItemAsync({ ...item, quantity: +e.target.value }))
    }
  }
  async function handleRemove(e, item){
    await dispatch(deleteItemFromCartAsync(item.id))
  }



  useEffect(() => {
    async function fetchItems(){
        await dispatch(fetchItemsByUserIdAsync());
    }

    fetchItems();
  },[])

  return (
    <div className="mx-auto mt-10 z-10 overflow-x-hidden bg-white max-w-7xl py-6 sm:px-6 lg:px-8"><div className="mt-8">
      <h2 className="text-4xl font-serif font-bold text-blue-700 underline ">My cart</h2>
      <div className="flow-root">
        <ul role="list" className="-my-6 p-5 divide-y divide-gray-200">
          {items && items.map((item) => (
            <li key={item.id} className="flex py-6">
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
                    <p className="ml-4 text-end font-semibold line-through">${item.productId.price * item.quantity}</p>
                  <p className="mt-1 text-sm text-gray-500">Stock Available: {item.productId.stock - item.quantity}</p>
                  <p className="mt-1 text-sm text-gray-500"> quantity Selected: {item.quantity}</p>
                </div>

                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className=" text-black font-bold ">Qty
                    <div className="inline ml-2">
                      {/* <select value={item.quantity} onChange={(e) => handleQuantity(e,item)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select> */}
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantity(e, item)}
                        min={1}
                        max={item.productId.stock}  // Set the maximum value to the available stock
                      />
                    </div>
                  </div>
                   


                  <div className="flex">
                    <button
                      onClick={(e) => handleRemove(e, item)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                    
                  </div>
                </div>
                
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

      {totalItems > 0 ? (<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>
            ${totalAmount}
          </p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total Items</p>
          <p>
            {totalItems} items
          </p>
        </div><p className="mt-0.5 text-sm text-start text-black">Shipping and taxes calculated at checkout.</p>
        <Link to='/checkout'>
          <div className="mt-6">
            <button
              className="flex text-center m-auto items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Pay and Order
            </button>
          </div>
        </Link>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{' '}
            <Link to='/'>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>

          </p>
        </div>
      </div>):<div className="flex flex-col justify-start items-start mt-2">OOPS ! Card is empty
        <button className="font-serif mt-2 bg-gray-200 px-2 py-1 hover:text-yellow-900 rounded-sm" onClick={() => navigate('/login')}>Start Adding items</button>
        </div>}
    </div>
  );
}

export default Cart;