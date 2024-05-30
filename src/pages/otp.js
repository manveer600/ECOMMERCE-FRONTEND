import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
function OTP() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Verify Otp              </h2>
                </div>

                <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate className="space-y-6 w-full" onSubmit={handleSubmit(async (data) => {
                        console.log(data);
                        // const response = await dispatch(createUserAsync({ email: data.email, password: data.password }));
                        // if (response?.payload?.success) {
                            // await sendEmail(data.email, 'Your One Time Password', '', generateOtp(6))
                            // <Navigate to='/otp' />
                        // }
                    })}>
                        {/* EMAIL */}
                        <div>
                            <label htmlFor="email" className="block text-start text-sm font-medium leading-6 text-gray-900">
                                ONE TIME PASSWORD:
                            </label>
                            <div className="mt-2">
                                <input
                                    id="otp"
                                    {
                                    ...register('otp',
                                        {
                                            required: 'OTP is required',
                                        })}
                                    type="otp"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className="text-red-700">{errors?.otp?.message}</p>
                            </div>
                        </div>

                        {/* PASSWORD */}
                        {/* <div>
                            <div className="flex items-centerjustify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register('password',
                                        {
                                            required: 'Password is required'
                                        })}
                                    name="password"
                                    type={showPassword ? 'text' : "password"}
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div className="relative">
                                    {!showPassword ? (
                                        <FaEye
                                            onClick={handlePassword}
                                            className="absolute right-4 bottom-3 cursor-pointer"
                                        />
                                    ) : (
                                        <FaEyeSlash
                                            onClick={handlePassword}
                                            className="absolute right-4 bottom-3 cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>
                            <p className="text-red-700">{errors?.password?.message}</p>
                        </div> */}

                        {/* CONFIRM PASSWORD */}
                        {/* <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required', validate: (value, formValues) => value === formValues.password || 'Password does not match'
                                    })}
                                    // name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : "password"}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div className="relative">
                                    {!showConfirmPassword ? (
                                        <FaEye
                                            onClick={handleConfirmPassword}
                                            className="absolute right-4 bottom-3 cursor-pointer"
                                        />
                                    ) : (
                                        <FaEyeSlash
                                            onClick={handleConfirmPassword}
                                            className="absolute right-4 bottom-3 cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>
                            <p className="text-red-700">{errors?.confirmPassword?.message}</p>
                        </div> */}

                        {/* {signUpError && <p className="text-red-700">{signUpError?.message}</p>} */}

                        {/* SUBMIT */}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div >
            </div >
        </>
    )
}

export default OTP;