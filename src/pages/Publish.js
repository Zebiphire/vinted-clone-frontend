import "../css/Publish.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Publish = ({ token }) => {
  const [file, setFile] = useState({});
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [exchange, setExchange] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log("token === ");
      console.log(token);
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("size", size);
      formData.append("brand", brand);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("price", price);
      formData.append("city", city);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue, veuillez réssayer");
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
      console.log(error.response);
    }
  };

  return (
    <div className="publish">
      <div className="container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div className="file">
            {preview ? (
              <div className="imagePreview">
                <img src={preview} alt="preview from product to add" />
                <div
                  className="removePreviewImage"
                  onClick={(event) => {
                    setPreview("");
                  }}
                >
                  X
                </div>
              </div>
            ) : (
              <div className="previewZone">
                <div className="design">
                  <label htmlFor="file" className="label">
                    <span className="signPlus">+</span>
                    <span className="addSpan">Ajouter une photo</span>
                  </label>
                  <input
                    type="file"
                    className="pictureFile"
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                      setPreview(URL.createObjectURL(event.target.files[0]));
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="paragraph">
            <div className="line">
              <h4>Titre</h4>
              <input
                type="text"
                value={title}
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="line">
              <h4>Décris ton article</h4>
              <textarea
                rows="5"
                placeholder="ex: porté quelquefois, taille correctement"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="paragraph">
            <div className="line">
              <h4>Marque</h4>
              <input
                type="text"
                placeholder="ex: Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="line">
              <h4>Taille</h4>
              <input
                type="text"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="line">
              <h4>Couleur</h4>
              <input
                type="text"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="line">
              <h4>Etat</h4>
              <input
                type="text"
                placeholder="ex: Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="line">
              <h4>Lieu</h4>
              <input
                type="text"
                placeholder="ex: Paris"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="paragraph">
            <div className="line">
              <h4>Prix</h4>
              <input
                type="text"
                placeholder="0,00 €"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
            <div className="line">
              <div className="checkboxProduct">
                {exchange ? (
                  <label htmlFor="exchange" className="checkboxChecked">
                    <FontAwesomeIcon icon="check" size="xs" color="white" />
                  </label>
                ) : (
                  <label htmlFor="exchange" className="checkboxDesign"></label>
                )}
                <input
                  type="checkbox"
                  name="exchange"
                  value="exchange"
                  onChange={() => setExchange(!exchange)}
                />
                <span>Je suis intéressé(e) par les échanges</span>
              </div>
            </div>
          </div>
          <div className="buttonNewProduct">
            <button type="submit" className="validation">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Publish;
