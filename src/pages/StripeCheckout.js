// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./StripeCheckoutForm";
// import { useSelector } from "react-redux";
// import '../Stripe.css'
// import { useLocation } from "react-router-dom";
// const stripePromise = loadStripe("pk_test_51PBZbsSAM9FrO44umUnTNJdWwpty0J2f6PMuYZ5fm2lN8sRsrYO9mWywryBC0Ejnim66DPklAfT9uNnqHW5cjsHF00BdGbv2Gl");


// export default function StripeCheckout() {
//     const order = useLocation();
//     console.log('bhagwan ki daya ho toh order mil jayega', order);
//     const currentOrder = useSelector((state) => state.orders.currentOrder);
//     const [clientSecret, setClientSecret] = useState("");
//     useEffect(() => {
//         // Create PaymentIntent as soon as the page loads
//         fetch("https://ecommerce-backend-gj2h.onrender.com/create-payment-intent", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
//         })
//             .then((res) => res.json())
//             .then((data) => setClientSecret(data.clientSecret));
//     }, []);

//     const appearance = {
//         theme: 'stripe',
//     };
//     const options = {
//         clientSecret,
//         appearance,
//     };

//     console.log('client Secret in frontend is set to', clientSecret);
//     return (
//         <div className="Stripe">
//             {clientSecret && (
//                 <Elements options={options} stripe={stripePromise}>
//                     <CheckoutForm />
//                 </Elements>
//             )}
//         </div>
//     );
// }







import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./StripeCheckoutForm";
import "../Stripe.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51PBZbsSAM9FrO44umUnTNJdWwpty0J2f6PMuYZ5fm2lN8sRsrYO9mWywryBC0Ejnim66DPklAfT9uNnqHW5cjsHF00BdGbv2Gl");

function StripeCheckout() {
    const order = useLocation();
    const currentOrder = order.state;
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("https://ecommerce-backend-gj2h.onrender.com/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                totalAmount: currentOrder.totalAmount
            }),

        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="Stripe">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm  order={currentOrder} />
                </Elements>
            )}
        </div>
    );
}


export default StripeCheckout;