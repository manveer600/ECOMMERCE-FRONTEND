import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./StripeCheckoutForm";
import { useSelector } from "react-redux";
import '../Stripe.css'
const stripePromise = loadStripe("pk_test_51PBZbsSAM9FrO44umUnTNJdWwpty0J2f6PMuYZ5fm2lN8sRsrYO9mWywryBC0Ejnim66DPklAfT9uNnqHW5cjsHF00BdGbv2Gl");

export default function StripeCheckout() {
    console.log('inside stripe checkout wala function');
    const currentOrder = useSelector((state) => state.orders.currentOrder);
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:8080/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
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

    console.log('client Secret in frontend is set to', clientSecret);
    return (
        <div className="Stripe">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}