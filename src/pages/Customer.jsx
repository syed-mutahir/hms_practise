import React, { useState, useEffect } from "react";
import "../index.css";
import fire from "../firebase";
import Footer from "../components/footer";
import { Link, Redirect } from "react-router-dom";
import Card from "../components/card.jsx";

const db = fire.firestore();

const Customer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    db.collection("hotels")
      .get()
      .then((res) => {
        if (res.size > 0) {
          let newArr = [];
          res.forEach((doc) => {
            newArr.push(doc.data());
          });
          setHotels(newArr);
        } else {
          setHotels([]);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("HMS_User");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <nav className="navbar">
          <a className="navbar-brand">
            <Link to="/">Hotelvito</Link>
          </a>

          <div>
            <form className="form-inline">
              <Link to="/Customer">
                <button className="btn btn-outline-primary mx-2" type="button">
                  Home
                </button>
              </Link>
              <Link to="/CustomerBooking">
                <button className="btn btn-outline-primary mx-2" type="button">
                  Bookings
                </button>
              </Link>
              <Link onClick={handleLogout}>
                <button className="btn btn-outline-primary mx-2" type="button">
                  Logout
                </button>
              </Link>
            </form>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            {hotels && hotels.length > 0 ? (
              hotels.map((hotel) => {
                return (
                  <Card
                    imgSrc={hotel.image}
                    hotelName={hotel.name}
                    hotelCity={hotel.city}
                    hotelAddress={hotel.address}
                    hotelBeds={hotel.noOfBeds}
                    roomType={hotel.roomType}
                    sellerId={hotel.sellerId}
                    Id={hotel.Id}
                    screen="customer"
                  />
                );
              })
            ) : (
              <h1>No Data</h1>
            )}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
};

export default Customer;
