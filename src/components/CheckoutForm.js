import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "../css/CheckoutForm.css";

const CheckoutForm = ({ productName, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (elements == null) {
        return;
      }
      const cardElements = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElements);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          title: productName,
          amount: totalPrice,
        }
      );

      if (response.data.status === "succeeded") {
        console.log("Payment succeeded !!");
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {completed === true ? (
        <div className="paymentCompleted">
          <h1>Paiement effectué !</h1>
        </div>
      ) : (
        <form className="formBuyButton" onSubmit={handleSubmit}>
          <CardElement className="cardElement" />
          <button
            className="buyButtonFinal"
            type="submit"
            disabled={!stripe || !elements}
          >
            Payer
          </button>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
