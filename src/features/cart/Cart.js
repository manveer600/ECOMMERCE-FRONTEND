import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteItemFromCartAsync, updateItemAsync } from "./CartSlice";
import { discountedPrice } from "../../app/constants";




function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state?.cart?.items);
  const [open, setOpen] = useState(true)
  const totalAmount = items.reduce((amount, item) => discountedPrice(item.productId) * item.quantity + amount, 0);
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  async function handleQuantity(e, item) {
    const inputValue = +e.target.value;
    const maxStock = item.productId.stock;
    const dataToBeUpdated = {
      quantity: inputValue
    }

    if (inputValue >= 1 && inputValue <= maxStock) {
      await dispatch(updateItemAsync({ productId: item.productId.id, dataToBeUpdated }))
    }
    else {
      e.target.value = Math.min(Math.max(inputValue, 1), item.productId.stock);
      const dataToBeUpdated = {
        quantity: e.target.value
      }
      await dispatch(updateItemAsync({ productId: item.productId.id, dataToBeUpdated }))
    }
  }
  async function handleRemove(e, item) {
    await dispatch(deleteItemFromCartAsync(item.id))
  }



  return (
    <div className="p-3">
      <div className="mx-auto mt-10 z-10 overflow-x-hidden p-4 bg-white max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="mt-8">
          <h2 className="text-4xl font-serif font-bold text-blue-700 underline  text-center">My cart</h2>
          <div className="flow-root ">
            <ul role="list" className="-my-6 p-5 divide-y divide-gray-200">
              {items && items.map((item) => (
                <li key={item.id} className="sm:flex text-center py-6">
                  {/* IMAGE */}
                  <div className="h-24 w-full sm:w-24 flex-shrink-0 overflow-hidden rounded-md ">
                    <img
                      src={item.productId.thumbnail}
                      alt={item.productId.title}
                      className="h-full m-auto "
                    />
                  </div>

                  {/* BAAKI DETAILS WALA TAG */}
                  <div className="sm:p-3 flex  flex-1 flex-col">
                    <div>
                      <div className="sm:flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.productId.title}> {} {item.productId.title}</a>
                        </h3>
                        <p >${discountedPrice(item.productId) * item.quantity}</p>
                      </div>
                      <p className=" sm:text-end font-semibold line-through">${item.productId.price * item.quantity}</p>
                      <p className="mt-1 text-sm sm:text-start text-gray-500">Stock Available: {item.productId.stock - item.quantity}</p>
                      <p className="mt-1 text-sm sm:text-start text-gray-500">Quantity Selected: {item.quantity}</p>
                    </div>

                    <div className="sm:flex flex-1 items-end mt-2 justify-between text-sm">
                      <div className=" text-black font-bold ">Qty
                        <div className="inline mt-2 ml-2">
                          <input
                            type="number"
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                            min={1}
                            max={item.productId.stock}  // Set the maximum value to the available stock
                          />
                        </div>
                      </div>



                      <div className="">
                        <button
                          onClick={(e) => handleRemove(e, item)}
                          type="button"
                          className="font-medium  text-indigo-600 mt-2 hover:text-indigo-500"
                        >
                          Remove Item
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
          </div><p className="mt-0.5 text-sm sm:text-start text-center text-black">Shipping and taxes calculated at checkout.</p>
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
        </div>) : <div className="flex flex-col justify-start text-center m-auto mt-2">OOPS ! Card is empty
          <button className="font-serif mt-2 bg-gray-200 px-2 py-1 hover:text-yellow-900 rounded-sm m-auto" onClick={() => navigate('/login')}>Start Adding items</button>
        </div>}
      </div>
    </div>
  );
}

export default Cart;