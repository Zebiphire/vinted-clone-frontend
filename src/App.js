import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [rangeValues, setRangeValues] = useState([0, 10000]);

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&sort=${
          sort ? "price-desc" : "price-asc"
        }&priceMin=${rangeValues[0]}&priceMax=${rangeValues[1]}`
      );
      console.log(search);
      console.log(sort);
      console.log(rangeValues[0]);
      console.log(rangeValues[1]);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search, sort, rangeValues]);

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        rangeValues={rangeValues}
        setRangeValues={setRangeValues}
      />
      <Routes>
        <Route path="/" element={<Home data={data} isLoading={isLoading} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/login/" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
