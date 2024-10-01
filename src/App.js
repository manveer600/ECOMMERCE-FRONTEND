import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import AdminHomepage from './pages/Admin/AdminHomepage.js';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin.js';
import AdminProductDetailsPage from './pages/Admin/AdminProductDetailsPage.js'
import AdminProductFormPage from './pages/Admin/AdminProductFormPage.js';
import AdminOrdersPage from './pages/Admin/AdminOrdersPage.js';
import StripeCheckout from './pages/StripeCheckout.js';
import ResetPasswordPage from './pages/ResetPasswordPage.js'
import TokenSentPage from './pages/TokenSentPage.js';
import ContactUsPage from './pages/ContactUsPage.js';
// import './App.css';
import SubmitOTP from "./pages/SubmitOTP.js";

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
      path:'/submitOTP',
      element: <SubmitOTP/>
    },
    {
      path: "/resetPassword/:resetToken",
      element: <ResetPasswordPage />
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
      path: "/contactUs",
      element: <Protected><ContactUsPage /></Protected>
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
      element: <Protected><Logout /></Protected>
    },

    {
      path: `/forgetPassword`,
      element: <ForgetPassword />
    },

    {
      path: "*",
      element: <PageNotFound />
    },

    {
      path: "tokenSent",
      element: <TokenSentPage />
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
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
