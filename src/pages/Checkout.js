import { useForm } from 'react-hook-form';
import Navbar from '../features/navbar/Navbar.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync, userInfo } from '../features/auth/authSlice.js';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { deleteItemFromCartAsync, updateItemAsync } from '../features/cart/CartSlice.js';
import { addOrderAsync } from '../features/order/orderSlice.js';
import { discountedPrice } from '../app/constants.js';


function Checkout() {
  const user = useSelector(userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state?.cart?.items);
  // const [open, setOpen] = useState(true)
  const totalAmount = items.reduce((amount, item) => discountedPrice(item.productId) * item.quantity + amount, 0);
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const currentOrder = useSelector((state) => state?.orders?.currentOrder);
  console.log('current order', currentOrder);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function handleQuantity(e, item) {
    if (e.target.value <= item.stock) {
      dispatch(updateItemAsync({ ...item, quantity: +e.target.value }))
    }
  }
  async function handleRemove(e, item) {
    await dispatch(deleteItemFromCartAsync(item.id))
  }

  async function handleOrder() {
    if (items && items.length > 0 && paymentMethod && selectedAddress) {

      const order = { items, totalAmount, totalItems, loggedInUserId: user.id, paymentMethod, selectedAddress, status: 'pending' };
      console.log('order y hai', order);
      await dispatch(addOrderAsync(order));
    } else {
      // TODO:
      //console.log('ki byi items toh add krlo pehle kakeeee')
      // YAHAN PE TOAST DIKHADO KI BYI PEHLE KUCH ADD TOH KRLO
    }

    // redirect to order success page
    // clear cart after order
    // on server change the stock
  }



  function handleAddress(e) {
    setSelectedAddress(user.address[e.target.value]);
  }

  function handlePayment(e) {
    setPaymentMethod(e.target.value);
  }

  return (
    <Navbar>
      {currentOrder !== null && currentOrder.paymentMethod === 'cash' && <Navigate to={`/orderSuccess/${currentOrder.id}`} replace={true} />}
      {/* TODO: BHAI Y CHEEZ GALAT HAI YAHAN PE VO WALA LOGIC LGEGA KI JAB PAYMENT SUCCESSFULL HO JAYE TB USER KA ORDER CREATE HO VRNA NA HO */}
      {currentOrder !== null && currentOrder.paymentMethod === 'card' && <Navigate to={`/stripe-checkout`} replace={true} />}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:flex p-3 space-x-5 font-serif lg:px-8">
        <div className='lg:w-1/2 text-start bg-white p-5'>
          <div className="space-y-12">

            {/* ADDRESS FORM */}
            <form noValidate onSubmit={handleSubmit(async (data) => {
              await dispatch(updateUserAsync({ ...user, address: [...user.address, data] }));
              reset();
            })}>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                  {/* First name */}
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('name', { required: 'Name required' })}
                        // name="name"
                        id="name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {
                      errors && errors?.name &&
                      <div className='mt-1 text-red-500'>{errors?.name?.message}</div>
                    }
                  </div>

                  {/* email */}
                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        // name="email"
                        {...register('email', { required: 'Email is required' })}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {
                      errors && errors?.email &&
                      <div className='mt-1 text-red-500'>{errors?.email?.message}</div>
                    }
                  </div>

                  {/* Phone number */}
                  <div className="sm:col-span-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phoneNumber"
                        // name="phoneNumber"
                        {...register('phoneNumber', { required: 'Phone Number is required' })}
                        type="tel"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {
                      errors && errors?.phoneNumber &&
                      <div className='mt-1 text-red-500'>{errors?.phoneNumber?.message}</div>
                    }
                  </div>

                  {/* Address */}
                  <div className="col-span-full">
                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        type="address"
                        // name="address"
                        {...register('address', { required: 'Addrress is required' })}
                        id="address"
                        autoComplete="address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {
                      errors && errors?.address &&
                      <div className='text-red-500 mt-1'>{errors?.address?.message}</div>
                    }
                  </div>

                  {/* city */}
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        // name="city"
                        {...register('city', { required: 'City is required' })}

                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {
                      errors && errors?.city &&
                      <div className='mt-1 text-red-500'>{errors?.city?.message}</div>
                    }
                  </div>

                  {/* state */}
                  <div className="sm:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        // name="region"
                        {...register('state', { required: 'State is required' })}
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {
                      errors && errors?.state &&
                      <div className='text-red-500 mt-1'>{errors?.state?.message}</div>
                    }
                  </div>

                  {/* zip/postal adress */}
                  <div className="sm:col-span-2">
                    <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        // name="postal-code".
                        {...register('postalCode', { required: 'Postal-code is required' })}

                        id="postalCode"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {
                      errors && errors?.postalCode &&
                      <div className='text-red-500 mt-1'>{errors?.postalCode.message}</div>
                    }
                  </div>

                </div>
              </div>


              {/* RESET AND ADD ADDRESS BUTTON */}
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={e => reset()}
                  type="button" className="text-sm font-semibold leading-6 text-gray-900">
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>

            </form>














            <div className="border-b border-gray-900/10  pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Existing Addresses</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from existing address
              </p>

              <ul role="list" className="  divide-y divide-gray-100 space-y-8">
                {user && user.address && user.address.map((address, index) => (
                  <div key={index} className=" border-2 p-3 flex justify-between  gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <label />
                      <input
                        onChange={handleAddress}
                        value={index}
                        name="address"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0  flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.address}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.email}</p>
                        {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.email}</p> */}
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.postalCode}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">{address.state}</p>
                      <p className="text-sm leading-6 text-gray-900">Phone: {address.phoneNumber}</p>
                    </div>
                  </div>
                ))}


                {
                  !user.address[0] && <p className='text-bold'>You haven't add any address yet</p>
                }
              </ul>



              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Choose One.</p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="Card"
                        onChange={handlePayment}
                        value="card"
                        checked={paymentMethod === 'card'}
                        name="payments"
                        // {...register, ('payments', { required: 'Card Details required' })}
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="Card" className="block text-sm font-medium leading-6 text-gray-900">
                        Card
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="Cash"
                        name="payments"
                        onChange={handlePayment}
                        checked={paymentMethod === 'cash'}
                        value='cash'
                        // {...register, ('payments', { required: 'Card Details required' })}
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="Cash" className="block text-sm font-medium leading-6 text-gray-900">
                        Cash
                      </label>
                    </div>
                    {/* <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                        No push notifications
                      </label>
                    </div> */}
                  </div>
                </fieldset>
              </div>
            </div>
          </div>


        </div>
        <div className='lg:w-1/2'> <div className="mx-auto mt-10 z-10 overflow-x-hidden bg-white max-w-7xl py-6 sm:px-6 lg:px-8"><div className="mt-8">
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
                      <p className="text-end line-through">${item.productId.price * item.quantity}</p>

                      <p className="mt-1 text-sm text-gray-500">Stock Available: {item.productId.stock - item.quantity}</p>
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
                  onClick={handleOrder}
                  className="flex text-center m-auto items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Place Order
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
                    // onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>

              </p>
            </div>
          </div>) : <div className="flex flex-col justify-start items-start mt-2">OOPS ! Card is empty
            <button className="font-serif mt-2 bg-gray-200 px-2 py-1 hover:text-yellow-900 rounded-sm" onClick={() => navigate('/login')}>Start Adding items</button>
          </div>}
        </div></div>
      </div>
    </Navbar>
  )
}


export default Checkout;