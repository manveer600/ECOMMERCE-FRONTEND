import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync, loggedInUserToken } from "../authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
function Signup() {
  const token = useSelector(loggedInUserToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  function handlePassword() {
    setShowPassword(!showPassword);
  }

  function handleConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }


  return (
    <>
      {token && <Navigate to='/' replace={true} ></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new account              </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit(async (data) => {
            const response = await dispatch(createUserAsync({ email: data.email, password: data.password }));
            if (response?.payload?.success) {
              <Navigate to='/' />
            }
          })}>
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
                  // name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-red-700">{errors?.email?.message}</p>
            </div>



            <div>
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
                  // name="password"
                  type={showPassword ? 'text' : "password"}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {!showPassword && <FaEye onClick={handlePassword} className="relative bottom-6 flex justify-center items-center text-end left-[350px]" />
                }
                {showPassword && <FaEyeSlash onClick={handlePassword} className="relative bottom-6 flex justify-center items-center text-end left-[350px]" />
                }
              </div>
              <p className="text-red-700">{errors?.password?.message}</p>
            </div>


            <div>
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
                {!showConfirmPassword && <FaEye onClick={handleConfirmPassword} className="relative bottom-6 flex justify-center items-center text-end left-[350px]" />
                }
                {showConfirmPassword && <FaEyeSlash onClick={handleConfirmPassword} className="relative bottom-6 flex justify-center items-center text-end left-[350px]" />
                }
              </div>
              <p className="text-red-700">{errors?.confirmPassword?.message}</p>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login?
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup;