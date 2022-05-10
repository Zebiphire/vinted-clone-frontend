import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "../css/CheckoutForm.css";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const cardElements = elements.getElement(CardElement);
    console.log(cardElements);
    const stripeResponse = await stripe.createToken(cardElements);
    console.log(stripeResponse);

    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        stripeToken: stripeResponse.token.id,
      }
    );
    console.log(response.data);
    if (response.data.status === "succeeded") {
      console.log("Payment succeeded !!");
    }
  };

  return (
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
  );
};

export default CheckoutForm;
