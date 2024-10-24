import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { forgotPasswordAsync } from "../authSlice";
import toast from "react-hot-toast";
import { useState } from "react";
function ForgetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://res.cloudinary.com/dkyhu1iqb/image/upload/v1728366767/ecommerce-thumbnail/yz5ltzfxwlr4jjdoss1e.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Forget Password Page
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate onSubmit={handleSubmit(async (data) => {
                        setLoading(true);
                        const response = await dispatch(forgotPasswordAsync(data));
                        setLoading(false);
                        if (response?.payload?.success) {
                            navigate('/tokenSent', { replace: true });
                        } else {
                            return toast.error(response?.payload?.message, {
                                id: 'forgotPasswordFailure',
                                duration: 1000
                            });
                        }
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
                                disabled={loading}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {loading ? <div className="spinner"></div> : 'Send Verification Code'}
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