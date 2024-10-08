import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { clearSignUpError, createUserAsync, generateOTP, loggedInUserToken } from "../authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Signup() {
  const token = useSelector(loggedInUserToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const signUpError = useSelector((state) => state?.auth?.signUpError);
  const emailValue = watch('email');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      if (signUpError) {
        await dispatch(clearSignUpError());
      }
    })()
  }, [emailValue, dispatch]);


  function handlePassword() {
    setShowPassword(!showPassword);
  }

  function handleConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <>
      {/* {token && <Navigate to='/' replace={true} ></Navigate>} */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://res.cloudinary.com/dkyhu1iqb/image/upload/v1728366767/ecommerce-thumbnail/yz5ltzfxwlr4jjdoss1e.png" alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new account              </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6 w-full" onSubmit={handleSubmit(async (data) => {
            setIsLoading(true);
            const response = await dispatch(generateOTP({ email: data.email, password: data.password }));
            setIsLoading(false);
            console.log('response after generating OTP', response);
            if (response?.payload?.success) {
              navigate('/submitOTP', { state: { email: data.email, password: data.password } });
            } else {
              return toast.error(response?.payload?.message, {
                id: 'error',
                duration: 1000
              })
            }
          })}>
            {/* EMAIL */}
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
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-700">{errors?.email?.message}</p>
              </div>
            </div>

            {/* PASSWORD */}
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
            </div>

            {/* CONFIRM PASSWORD */}
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
            </div>

            {signUpError && <p className="text-red-700">{signUpError?.message}</p>}

            {/* SUBMIT */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? <div className="spinner"></div> : 'Sign Up'}
              </button>
            </div>

          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login?
            </Link>
          </p>
        </div >
      </div >
    </>
  )
}

export default Signup;