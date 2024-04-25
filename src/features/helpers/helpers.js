import { useForm } from "react-hook-form";


export default function Formfields({ title, id, type }) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    
    return (
        <div className="sm:col-span-3">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {title}
            </label>
            <div className="mt-2">
                <input
                    type={type}
                    {...register('name', { required: 'Name required' })}
                    // {...register('name', { required: 'Name required' })}
                    // name={id}
                    id={id}

                    autoComplete={id}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            {
                errors && errors?.name &&
                <div className='mt-1 text-red-500'>{errors?.name?.message}</div>
            }
        </div>)
    // {/* First name */ }
    // <div className="sm:col-span-3">
    //     <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
    //         {title}
    //     </label>
    //     <div className="mt-2">
    //         <input
    //             type={type}
    //             {...register('name', { required: 'Name required' })}
    //             // {...register('name', { required: 'Name required' })}
    //             // name={id}
    //             id={id}

    //             autoComplete={id}
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //         />
    //     </div>
    //     {
    //         errors && errors?.name &&
    //         <div className='mt-1 text-red-500'>{errors?.name?.message}</div>
    //     }
    // </div>

    // {/* email */ }
    // <div className="sm:col-span-4">
    //     <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
    //         Email address
    //     </label>
    //     <div className="mt-2">
    //         <input
    //             id="email"
    //             // name="email"

    //             {...register('email', { required: 'Email is required' })}
    //             type="email"
    //             autoComplete="email"
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //         />
    //     </div>
    //     {
    //         errors && errors?.email &&
    //         <div className='mt-1 text-red-500'>{errors?.email?.message}</div>
    //     }
    // </div>

    // {/* Phone number */ }
    // <div className="sm:col-span-4">
    //     <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
    //         Phone Number
    //     </label>
    //     <div className="mt-2">
    //         <input
    //             id="phoneNumber"
    //             // name="phoneNumber"

    //             {...register('phoneNumber', { required: 'Phone Number is required' })}
    //             type="tel"
    //             autoComplete="phoneNumber"
    //             pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //         />
    //     </div>
    //     {
    //         errors && errors?.phoneNumber &&
    //         <div className='mt-1 text-red-500'>{errors?.phoneNumber?.message}</div>
    //     }
    // </div>

    // {/* Address */ }
    // <div className="col-span-full">
    //     <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
    //         Address
    //     </label>
    //     <div className="mt-2">
    //         <input
    //             type="address"
    //             // name="address"
    //             {...register('address', { required: 'Addrress is required' })}
    //             id="address"
    //             autoComplete="address"
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //         />
    //     </div>
    //     {
    //         errors && errors?.address &&
    //         <div className='text-red-500 mt-1'>{errors?.address?.message}</div>
    //     }
    // </div>

    // {/* city */ }
    // <div className="sm:col-span-2 sm:col-start-1">
    //     <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
    //         City
    //     </label>
    //     <div className="mt-2">
    //         <input
    //             type="text"
    //             // name="city"
    //             {...register('city', { required: 'City is required' })}

    //             id="city"
    //             autoComplete="address-level2"
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //         />
    //     </div>
    //     {
    //         errors && errors?.city &&
    //         <div className='mt-1 text-red-500'>{errors?.city?.message}</div>
    //     }
    // </div>

    // {/* state */ }
    // <div className="sm:col-span-2">
    //     <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
    //         State / Province
    //     </label>
    //     <div className="mt-2">
    //         <input
    //             type="text"
    //             // name="region"
    //             {...register('state', { required: 'State is required' })}
    //             id="region"
    //             autoComplete="address-level1"
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //         />
    //     </div>
    //     {
    //         errors && errors?.state &&
    //         <div className='text-red-500 mt-1'>{errors?.state?.message}</div>
    //     }
    // </div>

    // {/* zip/postal adress */ }
    // <div className="sm:col-span-2">
    //     <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
    //         ZIP / Postal code
    //     </label>
    //     <div className="mt-2">
    //         <input
    //             type="text"
    //             // name="postal-code".
    //             {...register('postalCode', { required: 'Postal-code is required' })}

    //             id="postalCode"
    //             autoComplete="postal-code"
    //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //         />
    //     </div>
    //     {
    //         errors && errors?.postalCode &&
    //         <div className='text-red-500 mt-1'>{errors?.postalCode.message}</div>
    //     }
    // </div>


}