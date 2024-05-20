import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { resetPasswordAsync } from "../authSlice";
function ResetPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetToken = useParams();
    console.log(resetToken);

    console.log("errors", errors);


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Reset Your Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form noValidate onSubmit={handleSubmit(async (newPassword) => {

                    console.log('data reset wala', newPassword);
                    const response = await dispatch(resetPasswordAsync({ password: newPassword.password, resetToken: resetToken.resetToken }));
                    console.log('response', response);
                    if (response?.payload?.success) {
                        console.log('login pe jaa na saale shakal kya dekh rha h');
                        navigate('/login');
                    }
                })} className="space-y-6" action="#" method="POST">


                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Set Your password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                {...register('password',
                                    {
                                        required: 'Password is required'
                                    })}
                                // name="password"
                                type="password"
                                autoComplete="password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <p className="text-red-700">{errors?.password?.message}</p>
                        {/* {errors && <p className="text-red-700">{errors?.password?.message}</p>
                        } */}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Update Password
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Back
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default ResetPasswordPage;