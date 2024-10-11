import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../../auth/authSlice.js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { userInfo } from "../../auth/authSlice";
import toast from "react-hot-toast";
function UserProfile() {
    const user = useSelector(userInfo);
    const dispatch = useDispatch();
    const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const email = useSelector((state) => state?.auth?.userInfo?.email);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();


    async function handleRemove(e, address, index) {
        const confirmation = window.confirm(`Are you sure you want to delete this address: ${address.address}?`);
        if (confirmation) {
            const userDetails = { ...user, address: [...user.address] };
            userDetails.address.splice(index, 1);
            setIsDelete(true);
            const response = await dispatch(updateUserAsync(userDetails));
            console.log(response);
            setIsDelete(false);
            if (response?.payload?.success) {
                return toast.success('Address deleted successfully', {
                    id: 'addressDeleted',
                    duration: 1000
                })
            } else {
                return toast.error(response?.payload?.message, {
                    id: 'errorUpdatingAddress',
                    duration: 1000
                })
            }
        }

    }

    async function handleEdit(addressUpdate, index) {
        const userDetails = { ...user, address: [...user.address] };
        userDetails.address.splice(index, 1, addressUpdate);
        setIsEdit(true);
        const response = await dispatch(updateUserAsync(userDetails));
        setIsEdit(false);
        if (response?.payload?.success) {
            toast.success('User updated successfully', {
                id: 'userUpdated',
                duration: 1000
            })
        } else toast.error(response?.payload?.message);
        setSelectedEditIndex(-1);
    }


    async function cancelEdit() {
        setSelectedEditIndex(-1);
    }


    function handleEditForm(index) {
        setSelectedEditIndex(index);
        const address = user.address[index]
        console.log(
            'address is this', address
        )
        setValue('name', address.name);
        setValue('email', address.email);
        setValue('phoneNumber', address.phoneNumber);
        setValue('address', address.address);
        setValue('city', address.city);
        setValue('state', address.state);
        setValue('postalCode', address.postalCode);
    }

    async function addNewAddress(newAddress) {
        const userDetails = { ...user, address: [...user.address] };
        userDetails.address.push(newAddress);
        setIsloading(true);
        const response = await dispatch(updateUserAsync(userDetails));
        console.log('response after updating address', response);
        setIsloading(false);
        if (response?.payload?.success) {
            toast.success('Address added.', {
                id: 'addAddressSuccess',
                duration: 2000
            })
            setShowAddressForm(false);
            return;
        } else {
            return toast.error(response?.payload?.message);
        }
    }

    return (
        <div className="p-2 font-serif">
            <p className="text-center font-serif underline text-yellow-800  text-5xl pt-3 sm:text-6xl  ">MY PROFILE</p>

            <div className="mx-auto mt-10 z-10 overflow-x-hidden bg-white p-3 max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="mt-8">
                    <h4 className="sm:text-xl font-serif font-bold text-red-600 ">Email: {user.email ? user.email : "Manveer"}</h4>
                    <h4 className="sm:text-xl font-serif font-bold text-red-600 ">Role: {user.role === 'admin' ? user.role : 'user'}</h4>
                    <div className="flow-root">
                        {showAddressForm === true ? <button
                            onClick={e => setShowAddressForm(false)}
                            className=" mt-4 mb-4 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Cancel Adding New Address
                        </button> : <button
                            onClick={e => setShowAddressForm(true)}
                            type="submit"
                            className=" mt-4 mb-4 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add New Address
                        </button>}
                        {showAddressForm === true && <form noValidate onSubmit={handleSubmit(async (newAddress) => {
                            console.log('new address is this', newAddress);
                            if (Object.keys(newAddress).length === 0) {
                                console.error('New address is empty');
                                return;
                            }

                            await addNewAddress(newAddress);
                            // await dispatch(updateUserAsync({ ...loggedInUser, addresses: [...loggedInUser.addresses, data] }));
                            reset();
                        })}>
                            {/* FORM TO ADD A NEW ADDRESS */}
                            <div className="border-b border-gray-900/10 pb-12 ">
                                <h2 className="text-xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1  gap-x-6 gap-y-8 sm:grid-cols-6">
                                    {/* <Formfields title="First Name" id='name' type='text' errors={errors} /> */}
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

                                                {...register('email', {
                                                    required: 'Email is required',
                                                })}
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            // value={email}
                                            // readOnly
                                            // disabled
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
                                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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
                            <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
                                <button
                                    onClick={e => reset()}
                                    type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Reset
                                </button>
                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {isLoading ? <div className="spinner"></div> : 'Add Address'}
                                </button>
                            </div>

                        </form>}
                    </div>

                    {
                        user.address[0] ? <p className="text-xl font-serif mt-4 font-bold">Your Addresses :</p> : <p className="text-bold text-lg "> You haven't added a single address.</p>
                    }
                    {user.address.map((address, index) =>
                        <div key={index}>
                            {selectedEditIndex === index ? <form noValidate onSubmit={handleSubmit(async (data) => {
                                handleEdit(data, index);
                                reset();
                            })}>
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-xl font-semibold leading-7 mt-2 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                                        {/* <Formfields title="First Name" id='name' type='text' errors={errors} /> */}
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
                                                    autoComplete="phoneNumber"
                                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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
                                <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
                                    <button
                                        onClick={e => reset()}
                                        type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save Address
                                    </button>
                                </div>

                            </form> : null}
                            <div key={index} className="p-3 border flex flex-col md:flex-row justify-between gap-3 py-5">
                                {/* REST DETAILS OF ADDRESSES */}
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0  flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.address}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{email}</p>
                                        {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.email}</p> */}
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.postalCode}</p>
                                    </div>
                                </div>

                                {/* STATE AND PHONE NUMBER */}
                                <div className="md:flex flex-col md:items-end">
                                    <p className="text-sm leading-6 text-gray-900">{address.state}</p>
                                    <p className="text-sm leading-6 text-gray-900">Phone: {address.phoneNumber}</p>
                                </div>

                                {/* BUTTONS */}
                                <div className="md:flex space-x-2 flex-col md:items-end">
                                    {selectedEditIndex !== index ? <button
                                        onClick={(e) => handleEditForm(index)}
                                        type="button"
                                        disabled={isEdit}
                                        className="font-bold  bg-green-600 text-white py-1 px-3 hover:rounded-lg md:bg-transparent md:text-blue-700"
                                    >
                                        {isEdit ? <div className="spinner" /> : 'Edit'}
                                    </button> : <button
                                        onClick={(e) => cancelEdit(index)}
                                        type="button"
                                        className="font-bold   bg-green-600 text-white py-1 px-3 hover:rounded-lg md:bg-transparent md:text-blue-700"
                                    >
                                        Cancel
                                    </button>}
                                    <button
                                        onClick={(e) => handleRemove(e, address, index)}
                                        type="button"
                                        className=" py-1 px-3 bg-red-600 text-white font-bold hover:rounded-lg md:bg-transparent md:text-blue-700 "
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* {order.totalItems > 0 ? (<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    


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
                </div>) : <div className="flex flex-col justify-start items-start mt-2">OOPS ! You haven't ordered anything
                    <button className="font-serif mt-2 bg-gray-200 px-2 py-1 hover:text-yellow-900 rounded-sm" onClick={() => navigate('/')}>See Items</button>
                </div>} */}
        </div>
    );
}

export default UserProfile;