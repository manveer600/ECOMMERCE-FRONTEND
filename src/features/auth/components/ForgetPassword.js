import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom';
import { forgotPasswordAsync } from "../authSlice";
function ForgetPassword() {
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
                        Forget Password Page
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate onSubmit={handleSubmit(async (data) => {
                        // IMPLEMENTATION IN BACKEND IS NECESSARY
                        console.log('email hi aayegi obv');
                        await dispatch(forgotPasswordAsync(data));
                    })} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-start text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {
                                    ...register('email',
                                        {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: 'Email not valid',
                                            }
                                        })}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="text-red-700">{errors?.email?.message}</p>

                        </div>



                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Send Verification Code
                            </button>
                            <p className="text-center mt-8 "> Go back to {" "}
                                <Link to='/login' className="text-blue-900 font-semibold">
                                    Login
                                </Link>

                            </p>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}

export default ForgetPassword;