import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Signup.css";

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          password: password,
          username: username,
        }
      );
      if (response.data.token) {
        console.log(response.data.token);
        setUser(response.data.token);
        navigate("/");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte chez nous !");
      }
      console.log(error.message);
    }
  };

  return (
    <div className="signup">
      <h2 className="h2Signup">S'inscrire</h2>
      <form onSubmit={handleSubmit} className="formSignup">
        <input
          className="inputSignup"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Nom d'utilisateur"
          type="text"
        />
        <input
          className="inputSignup"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
          }}
          placeholder="Email"
          type="email"
        />
        <input
          className="inputSignup"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Mot de passe"
          type="password"
        />
        <span className="signupErrorMessage">{errorMessage}</span>
        <div className="checkbox">
          <div className="checkboxDiv">
            <input type="checkbox" />
            <span className="checkboxSpan">S'inscrire à notre newsletter</span>
          </div>
          <div className="checkboxDiv">
            <input type="checkbox" />
            <span className="checkboxSpan">
              En m'inscrivant je confirme avoir lu et accepté{" "}
              <a href="https://www.vinted.fr/terms_and_conditions">
                les Termes & Conditions
              </a>{" "}
              et avoir lu la{" "}
              <a href="https://www.vinted.fr/privacy-policy">
                Politique de Confidentialité
              </a>
              . Je confirme avoir plus de 18 ans.
            </span>
          </div>
        </div>
        <button className="buttonSignupPage" type="submit">
          S'inscrire
        </button>
      </form>
      <Link className="linkSignup" to="/login">
        Tu as déjà un compte ? Connecte-toi !
      </Link>
    </div>
  );
};

export default Signup;
