import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import "../css/Payment.css";

const Payment = ({
  productName,
  productId,
  price,
  protectionFees,
  shippingFees,
  totalPrice,
}) => {
  const stripePromise = loadStripe(
    "pk_test_51KxopmINODSEySKQ1RX6rBl4m6LOY7RQJFD01r7doozTazjS3BI1Bt5l0Twn8sws28ghEYOjlc3Cmkvi1tO8ttGh002SL8vdmJ"
  );

  return (
    <div className="payment">
      <div className="summaryInfos">
        <div className="title">
          <h2>Résumé de la commande</h2>
        </div>
        <div className="content">
          <span className="titlePosition">Commande</span>{" "}
          <span className="pricePosition">{price} €</span>
        </div>
        <div className="content">
          <span className="titlePosition">Frais protection acheteurs</span>{" "}
          <span className="pricePosition">{protectionFees} €</span>
        </div>
        <div className="content">
          <span className="titlePosition">Frais de port</span>{" "}
          <span className="pricePosition">{shippingFees} €</span>
        </div>
        <div className="dividerPayment" />
        <div className="content">
          <span className="titlePosition">Total</span>
          <span className="pricePosition">{totalPrice} €</span>
        </div>
      </div>
      <div className="card">
        <span>
          Il ne vous reste plus qu'un étape pour vous offrir
          <span className="boldSpan"> {productName}</span>Vous allez payer{" "}
          <span className="boldSpan">{totalPrice} €</span> (frais de protection
          et frais de port inclus).
        </span>
        <div className="dividerPayment" />
        <div className="CheckoutForm">
          <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};
export default Payment;
