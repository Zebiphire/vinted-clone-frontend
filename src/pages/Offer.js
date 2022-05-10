import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/Offer.css";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const price = data.product_price;
  const protectionFees = (price / 10).toFixed(2);
  const shippingFees = (protectionFees * 2).toFixed(2);
  const total = Number(price) + Number(protectionFees) + Number(shippingFees);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div className="offer">
      <div className="containerOffer">
        <div className="picture">
          {data.product_pictures.length === 0 ? (
            <img
              className="pictureOffer"
              src={data.product_image.secure_url}
              alt={data.product_name}
            />
          ) : (
            <img
              className="pictureOffer"
              src={data.product_pictures[0].secure_url}
              alt={data.product_name}
            />
          )}
        </div>
        <div className="infos">
          <div>
            <span className="price">{data.product_price} €</span>
            <ul className="list">
              {data.product_details.map((elem, index) => {
                const keys = Object.keys(elem);
                return (
                  <li key={index}>
                    <span>{keys[0]}</span>
                    <span>{elem[keys[0]]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <div className="divider" />
            <div className="contentOffer">
              <p className="nameProduct">{data.product_name}</p>
              <p className="descriptionProduct">{data.product_description}</p>
              <div className="infosClient">
                {data.owner && data.owner.account.avatar && (
                  <img
                    className="avatar"
                    alt={data.product_name}
                    src={data.owner.account.avatar.secure_url}
                  />
                )}
                <span>{data.owner && data.owner.account.username}</span>
              </div>
            </div>
          </div>
          <button
            className="buyButton"
            onClick={() => {
              navigate("/payment", {
                state: {
                  productId: id,
                  productName: data.product_name,
                  totalPrice: total,
                  protectionFees: protectionFees,
                  shippingFees: shippingFees,
                  price: data.product_price,
                },
              });
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
