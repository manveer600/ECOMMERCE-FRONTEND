import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, loggedInUserToken, clearLoginError } from "../authSlice";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Login() {
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state?.auth?.loginError);
  const token = useSelector(loggedInUserToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const emailValue = watch('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function handleShow() {
    setShowPassword(!showPassword);
  }


  useEffect(() => {
    (async function () {
      await dispatch(clearLoginError());
    })()
  }, [dispatch, emailValue])

  return (
    <>

      {token && <Navigate to='/' replace={true}></Navigate>}
      <div className="flex min-h-full  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto text-center sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div>
          <form noValidate onSubmit={handleSubmit(async (data) => {
            setIsLoading(true);
            const response = await dispatch(loginUserAsync({ email: data.email, password: data.password }));
            setIsLoading(false);
            if (response?.payload?.success) {
              <Navigate to='/' replace={true} />
            }
          })} className="space-y-6  sm:m-auto sm:w-[500px] w-full p-2" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-start text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {
                  ...register('email',
                    {
                      required: 'Email is required',
                      autoComplete: "email",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Email not valid',
                      }
                    })}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="text-red-700">{errors?.email?.message}</p>

            </div>

            <div>
              <div className="flex  items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/forgetPassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 ">
                <input
                  id="password"
                  {...register('password',
                    {
                      required: 'Password is required'
                    })}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="relative">
                  {!showPassword ? (
                    <FaEye
                      onClick={handleShow}
                      className="absolute right-4 bottom-3 cursor-pointer"
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={handleShow}
                      className="absolute right-4 bottom-3 cursor-pointer"
                    />
                  )}
                </div>

              </div>
              <p className="text-red-700">{errors?.password?.message}</p>
              {loginError && <p className="text-red-700">{loginError?.message}</p>
              }
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? <div className="spinner" id='spinner'></div> : 'Sign in'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Signup now
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login;