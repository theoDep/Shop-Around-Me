import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faGlobe,
  faPhone,
  faEnvelope,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import storeLogo from "../assets/images/store.png";
import logoAlone from "../assets/images/logo_alone.png";
import { useAuthContext } from "../contexts/AuthContext";

export default function ShopDetails() {
  const navigate = useNavigate();
  const precedent = () => navigate(-1);

  const { id } = useParams();

  const [shop, setShop] = useState();

  const getShop = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
        }/shops/${id}`
      );

      const { data } = response;

      const responseAddress = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
        }/address/reverse/?lon=${data.x}&lat=${data.y}`
      );

      const address = responseAddress.data.features[0].properties.label;

      setShop({ ...data, address });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShop();
  }, []);

  const [fav, setFav] = useState([]);

  const {
    loginData: { user },
  } = useAuthContext();

  const getFavorite = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
        }/shop_user/${user.id}`
      );

      setFav(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const isFavorite = () => {
    return fav.some((favorite) => favorite.shop_id === parseInt(id, 10));
  };

  const removeFavorite = async () => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
        }/shop_user/shops/${id}/user/${user.id}`
      );

      getFavorite();
    } catch (error) {
      console.error(error);
    }
  };

  const addFavorite = async () => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
        }/shop_user/`,
        {
          shop_id: parseInt(id, 10),
          user_id: parseInt(user.id, 10),
        }
      );

      getFavorite();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = () => {
    removeFavorite(id);
  };

  const handleAdd = () => {
    addFavorite(id);
  };

  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <main className="flex flex-col w-screen px-8 pt-8 pb-8 tracking-wide text-[#4F4E47]">
      <img src={logoAlone} alt="logo" className="max-w-[4rem] mr-2 mb-8" />
      {shop && (
        <>
          <div className="flex">
            <p className=" text-2xl mr-2">{shop.name}</p>
            {fav && isFavorite() ? (
              <button type="button" onClick={handleRemove}>
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  className="text-2xl text-red-700 mr-3"
                />
              </button>
            ) : (
              <button type="button" onClick={handleAdd}>
                <FontAwesomeIcon
                  icon={faHeartEmpty}
                  className="text-2xl text-red-700 mr-3"
                />
              </button>
            )}
          </div>
          <p className=" text-m mb-2 leading-4">{shop.address}</p>
          <div>
            <button
              type="button"
              className="text-m w-[5rem] mr-2 pt-3 pb-2 border-solid border-2 rounded-full border-[#4F4E47] text-[#4F4E47] focus:outline-none focus:shadow-outline leading-none"
              onClick={precedent}
            >
              ←
            </button>
            <button
              type="button"
              className="text-m w-[5rem] pt-3 pb-2 border-solid border-2 rounded-full border-[#255f29] text-[#255f29] focus:outline-none focus:shadow-outline leading-none"
            >
              <Link to={`/itinerary/${shop.x}/${shop.y}`}>Y aller</Link>
            </button>
          </div>
          <img
            src={shop.img_url ? shop.img_url : storeLogo}
            alt={`${shop.name} façade`}
            className={
              shop.img_url
                ? "my-8 border-2 border-[#4F4E47] rounded-lg"
                : "my-8 rounded-lg px-16"
            }
          />
          <section className="columns-2 text-center mb-10">
            <ul className="text-left">
              Contact
              <li className="general-text string-wrap">
                <FontAwesomeIcon icon={faEnvelope} /> :{" "}
                {shop.email ? shop.email : "à renseigner"}
              </li>
              <li className="general-text">
                <FontAwesomeIcon icon={faPhone} /> :{" "}
                {shop.phone ? shop.phone : "à renseigner"}
              </li>
              <li className="general-text">
                <a href={shop.fb_page} target="blank">
                  <FontAwesomeIcon icon={faFacebook} /> : Facebook
                </a>
              </li>
              <li className="general-text">
                <a href={shop.insta_page} target="blank">
                  <FontAwesomeIcon icon={faInstagram} /> : Instagram
                </a>
              </li>
              <li className="general-text">
                <a href={shop.website} target="blank">
                  <FontAwesomeIcon icon={faGlobe} /> : Website
                </a>
              </li>
            </ul>
            <br />
            <ul className="text-left">
              {" "}
              Horaires
              <li className="general-text">
                Lundi :{" "}
                {shop.opening_hours ? shop.opening_hours.lundi : "à renseigner"}
              </li>
              <li className="general-text">
                Mardi :{" "}
                {shop.opening_hours ? shop.opening_hours.mardi : "à renseigner"}
              </li>
              <li className="general-text">
                Mercredi :{" "}
                {shop.opening_hours
                  ? shop.opening_hours.mercredi
                  : "à renseigner"}
              </li>
              <li className="general-text">
                Mercredi :{" "}
                {shop.opening_hours ? shop.opening_hours.jeudi : "à renseigner"}
              </li>
              <li className="general-text">
                Vendredi :{" "}
                {shop.opening_hours
                  ? shop.opening_hours.vendredi
                  : "à renseigner"}
              </li>
              <li className="general-text">
                Samedi :{" "}
                {shop.opening_hours
                  ? shop.opening_hours.samedi
                  : "à renseigner"}
              </li>
              <li className="general-text">
                Dimanche :{" "}
                {shop.opening_hours
                  ? shop.opening_hours.dimanche
                  : "à renseigner"}
              </li>
            </ul>
          </section>
        </>
      )}
    </main>
  );
}
