import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/Login.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      console.log("Je suis dans handleSubmit");
      event.preventDefault();
      setIsLoading(true);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        console.log(response.data.token);
        setUser(response.data.token);
        setIsLoading(false);
        navigate("/");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMessage("Mauvais email et/ou mot de passe");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login">
      <h2 className="h2Login">Se connecter</h2>
      <form onSubmit={handleSubmit} className="formLogin">
        <input
          className="inputLogin"
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
          }}
          placeholder="Email"
          type="email"
        />
        <input
          className="inputLogin"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Mot de passe"
          type="password"
        />
        <span className="loginErrorMessage">{errorMessage}</span>

        <button
          className="buttonLoginPage"
          disabled={isLoading ? true : false}
          type="submit"
        >
          Se connecter
        </button>
        <Link className="linkLogin" to="/signup">
          Pas encore de compte ? Inscris-toi !
        </Link>
        <Link className="linkLogin" to="/signup">
          Un problème ?
        </Link>
      </form>
    </div>
  );
};

export default Login;
