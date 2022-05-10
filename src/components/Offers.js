import "../css/Offers.css";
import { useNavigate } from "react-router-dom";
import Unknown from "../assets/img/unknown.png";

const Offers = ({ data }) => {
  let navigate = useNavigate();
  console.log("je suis dans offers");
  return (
    <div className="containerOffers">
      <div className="username">
        {data.owner && data.owner.account.avatar && (
          <>
            {data.owner.account.avatar.secure_url === null || undefined ? (
              <img
                className="avatarImage"
                alt={data.product_name}
                src={Unknown}
              />
            ) : (
              <img
                className="avatarImage"
                alt={data.product_name}
                src={data.owner.account.avatar.secure_url}
              />
            )}
          </>
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
