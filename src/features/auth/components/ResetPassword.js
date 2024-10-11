import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { resetPasswordAsync } from "../authSlice";
import toast from "react-hot-toast";
import { useState } from "react";
function ResetPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetToken = useParams();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://res.cloudinary.com/dkyhu1iqb/image/upload/v1728366767/ecommerce-thumbnail/yz5ltzfxwlr4jjdoss1e.png" alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Reset Your Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form noValidate onSubmit={handleSubmit(async (newPassword) => {
                    setIsLoading(true);
                    const response = await dispatch(resetPasswordAsync({ password: newPassword.password, resetToken: resetToken.resetToken }));
                    setIsLoading(false);
                    if (response?.payload?.success) {
                        toast.success('Password updated Successfully');
                        navigate('/login');
                    } else {
                        return toast.error(response?.payload?.message);
                        // navigate('/forgetPassword', { replace: true });
                    }
                })} className="space-y-6" action="#" method="POST">


                    <div>
                        {/* PASSWORD */}
                        <div className="mt-2">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <input
                                id="password"
                                {...register('password',
                                    {
                                        required: 'Password is required',
                                    })}
                                type="password"
                                autoComplete="password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors && errors.password && <p className="text-red-700">{errors?.password?.message}</p>}
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="mt-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                {...register('confirmPassword',
                                    {
                                        required: 'Confirm Password is required',
                                        validate: (value, password) => value === password.password || 'Passwords does not match'
                                    })}
                                type="password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors && errors.confirmPassword && <p className="text-red-700">{errors?.confirmPassword?.message}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {isLoading ? <div className="spinner"></div> : 'Update Password'}
                        </button>
                    </div>
                </form>


            </div>
        </div>
    );
}

export default ResetPasswordPage;