import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckOutForm";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../Hooks/useCart";

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_GATEWAY_PK}`);
const Payment = () => {
  const [cart] = useCart();
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const price = parseFloat(total.toFixed(2))
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Payment</title>
      </Helmet>
      <SectionTitle
        heading="Payment"
        subHeading="please process"
      ></SectionTitle>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
