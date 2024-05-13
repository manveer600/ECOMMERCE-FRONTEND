import React, { useEffect } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { fetchLoggedInUserAsync } from './features/user/userSlice.js';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../src/pages/Homepage.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';
import CartPage from './pages/CartPage.js';
import Checkout from './pages/Checkout.js';
import ProductDetailsPage from './pages/ProductDetailsPage.js'
import Protected from './features/auth/components/Protected.js';
import PageNotFound from './pages/404.js';
import OrderSuccessPage from './pages/orderSuccessPage.js';
import UserOrderPage from './pages/UserOrderPage.js';
import UserProfilePage from './pages/UserProfilePage.js';
import Logout from './features/auth/components/Logout.js';
import ForgetPassword from './features/auth/components/ForgetPassword.js';
import './App.css';
import AdminHomepage from './pages/Admin/AdminHomepage.js';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin.js';
import AdminProductDetailsPage from './pages/Admin/AdminProductDetailsPage.js'
import AdminProductFormPage from './pages/Admin/AdminProductFormPage.js';
import AdminOrdersPage from './pages/Admin/AdminOrdersPage.js';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { fetchOrdersByUserAsync } from './features/order/orderSlice.js';
import { checkAuthAsync, loggedInUserToken } from './features/auth/authSlice.js';
import StripeCheckout from './pages/StripeCheckout.js';
// import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Protected> <Home /></Protected>
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/signup",
      element: <SignupPage />
    },
    {
      path: "/cart",
      element: <Protected><CartPage /></Protected>
    },
    {
      path: "/checkout",
      element: <Protected><Checkout /></Protected>
    },
    {
      path: "/productdetails/:id",
      element: <Protected><ProductDetailsPage /></Protected>
    },

    {
      path: "/profile",
      element: <Protected><UserProfilePage /></Protected>
    },

    {
      path: "/my-orders",
      element: <Protected><UserOrderPage /></Protected>
    },

    {
      path: `/orderSuccess/:id`,
      element: <Protected><OrderSuccessPage /></Protected>
    },

    {
      path: `/stripe-checkout`,
      element: <Protected><StripeCheckout /></Protected>
    },

    {
      path: `/logout`,
      element: <Logout />
    },

    {
      path: `/forgetPassword`,
      element: <ForgetPassword />
    },

    {
      path: "*",
      element: <PageNotFound />
    },




    // ADMIN ROUTES
    {
      path: "/admin",
      element: <ProtectedAdmin><AdminHomepage /></ProtectedAdmin>
    },

    {
      path: `/admin/product-form`,
      element: <ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>
    },


    {
      path: "/admin/productdetails",
      element: <ProtectedAdmin><AdminProductDetailsPage /></ProtectedAdmin>
    },


    {
      path: "/admin/editProduct/:id",
      element: <ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>
    },


    {
      path: "/admin/orders",
      element: <ProtectedAdmin><AdminOrdersPage /></ProtectedAdmin>
    },



  ]);

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
