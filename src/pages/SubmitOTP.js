import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { createUserAsync } from "../features/auth/authSlice";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
export default function SubmitOTP() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const stateData = state;
    console.log('state data is this', stateData);
    const navigate = useNavigate();
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://res.cloudinary.com/dkyhu1iqb/image/upload/v1728366767/ecommerce-thumbnail/yz5ltzfxwlr4jjdoss1e.png" alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Verify Otp              </h2>
                </div>

                <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate className="space-y-6 w-full" onSubmit={handleSubmit(async (data) => {
                        console.log(data);
                        console.log('otp is this', data.OTP);
                        console.log('localstorage wala otp is this', localStorage.getItem('OTP'));
                        if (data.OTP.toString() == localStorage.getItem('OTP').toString()) {
                            console.log('OTPS ARE EQUAL')
                            setIsLoading(true);
                            const response = await dispatch(createUserAsync(stateData));
                            setIsLoading(false);
                            localStorage.setItem('OTP', '');
                            console.log('response is this', response);
                            if (response?.payload?.success) {
                                console.log('SUCCESS');
                                navigate('/');
                            }
                        } else {
                            console.log('OTPS ARE NOT EQUAL')
                            return toast.error('OTP is not valid. Please try again', {
                                id: "OTPInvalid",
                                duration: 1000
                            })
                        }
                    })}>
                        <div>
                            <label htmlFor="email" className="block text-start text-sm font-medium leading-6 text-gray-900">
                                ONE TIME PASSWORD:
                            </label>
                            <div className="mt-2">
                                <input
                                    id="OTP"
                                    {
                                    ...register('OTP',
                                        {
                                            required: 'OTP is required',
                                        })}
                                    type="OTP"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className="text-red-700">{errors?.OTP?.message}</p>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isLoading ? <div className="spinner" /> : 'Submit OTP'}
                            </button>
                        </div>

                    </form>
                </div >
            </div >
        </>
    )
}