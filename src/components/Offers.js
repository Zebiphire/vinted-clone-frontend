import "../css/Offers.css";
import { useNavigate } from "react-router-dom";

const Offers = ({ data }) => {
  let navigate = useNavigate();
  return (
    <div className="containerOffers">
      <div className="username">
        {data.owner && data.owner.account.avatar && (
          // data.owner.account.avatar.secure_url === undefined ? (
          //   <img
          //     alt={data.product_name}
          //     src={data.owner.account.avatar.secure_url}
          //   />
          // ) : (
          <img
            alt={data.product_name}
            src={data.owner.account.avatar.secure_url}
            onError="src=../assets/img/unknow.svg"
          />
        )}
        <span>{data.owner && data.owner.account.username}</span>
      </div>
      <div onClick={() => navigate(`offer/${data._id}`)}>
        <img alt={data.title} src={data.product_image.secure_url} />
        <div className="offerInformations">
          <span>{data.product_price} €</span>
          <span>{data.product_details[1]["TAILLE"]}</span>
          <span>{data.product_details[0]["MARQUE"]}</span>
        </div>
      </div>
    </div>
  );
};
export default Offers;
