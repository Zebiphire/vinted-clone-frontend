import Offers from "../components/Offers";
import "../css/Home.css";

const Home = ({ data, isLoading }) => {
  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div className="container">
      <div className="heroHome">
        <img
          src="../assets/img/torn.svg"
          alt="hero svg from home page"
          className="heroImage"
        ></img>
        <div className="wrap">
          <div className="ready">
            <h4>Prêts à faire du tri dans vos placards ?</h4>
            <button>Vends maintenant</button>
            <p>Découvrir comment ça marche</p>
          </div>
        </div>
      </div>
      <div className="homeOffers">
        {data.offers &&
          data.offers.map((data, index) => {
            return <Offers key={index} data={data} />;
          })}
      </div>
    </div>
  );
};
export default Home;
