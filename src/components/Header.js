import "../css/Header.css";
import svgLogo from "../assets/img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import PriceRange from "./PriceRange";

const Header = ({
  token,
  setUser,
  setSearch,
  sort,
  setSort,
  setRangeValues,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="header">
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={svgLogo} alt="svg logo vinted" />
        </div>
        <div className="search">
          <input
            type="text"
            className="inputSearch"
            placeholder="Rechercher des articles"
            onChange={(event) => {
              console.log(event.target.value);
              setSearch(event.target.value);
            }}
          ></input>
          <FontAwesomeIcon icon="search" className="InputLogo" />
        </div>
        <div className="buttons">
          <div className="buttons">
            {token ? (
              <button
                className="buttonSignOut buttons"
                onClick={() => {
                  setUser(null);
                }}
              >
                Se déconnecter
              </button>
            ) : (
              <div className="buttons">
                <button
                  className="buttonSignup buttons"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  S'inscrire
                </button>
                <button
                  className="buttonLogin buttons"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Se connecter
                </button>
              </div>
            )}
          </div>
          <button className="buttonSold buttons">Vends tes articles</button>
        </div>
      </div>
      <div className="bottomBar">
        <div className="sortButton">
          <span style={{ marginRight: 10 }}>Trier par prix : </span>
          <span className="checkbox">
            <input type="checkbox" checked={sort} name="price" />
            <div
              className="wrapper"
              onClick={() => {
                setSort(!sort);
              }}
            >
              <div className="knob">
                <span>{sort ? "⇣" : "⇡"}</span>
              </div>
            </div>
          </span>
        </div>
        <div className="priceRange">
          <span>Prix entre : </span>
          <PriceRange setRangeValues={setRangeValues} />
        </div>
      </div>
      <div className="borderBottom"></div>
      <div class="topnav">
        <a href="#home" class="active">
          Femmes
        </a>
        <a href="#Home">Hommes</a>
        <a href="#Home">Enfants</a>
        <a href="#Home">Maison</a>
        <a href="#Home">Diverstissement</a>
        <a href="#Home">Animaux</a>
        <a href="#Home">A propros</a>
        <a href="#Home">Notre plateforme</a>
      </div>
    </div>
  );
};
export default Header;
