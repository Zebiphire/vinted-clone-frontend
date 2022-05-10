import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import "../css/Payment.css";

const Payment = () => {
  const location = useLocation();
  const {
    productId,
    productName,
    totalPrice,
    protectionFees,
    shippingFees,
    price,
  } = location.state;
  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
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
          <span className="boldSpan"> {productName}.</span> Vous allez payer{" "}
          <span className="boldSpan">{totalPrice} €</span> (frais de protection
          et frais de port inclus).
        </span>
        <div className="dividerPayment" />
        <div className="CheckoutForm">
          <Elements stripe={stripePromise}>
            <CheckoutForm
              productName={productName}
              totalPrice={totalPrice}
            ></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};
export default Payment;
