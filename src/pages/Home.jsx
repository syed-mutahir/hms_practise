import React, { useEffect, useState } from "react";
import "../index.css";
import Footer from "../components/footer";
import Card from "../components/card.jsx";
import fire from "../firebase";
import Login from "../components/login.jsx";
import { Link, Redirect } from "react-router-dom";
import Modal from "@material-ui/core/Modal";

const db = fire.firestore();

const Home = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [sellerLoggedIn, setSellerLoggedIn] = useState(false);
  const [hotels, setHotels] = useState(false);

  const handleOpen = (type) => {
    setType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setType(null);
    setOpen(false);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("HMS_User"));
    if (data) {
      if (data.type === 1) {
        setSellerLoggedIn(true);
      } else {
        setUserLoggedIn(true);
      }
    }

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


  if (sellerLoggedIn) {
    return <Redirect to="/Seller" />;
  } else if (userLoggedIn) {
    return <Redirect to="/Customer" />;
  } else {
    return (
      <div>
        <nav className="navbar">
          <a className="navbar-brand">
            <Link to="/">Hotelvito</Link>
          </a>

          <div>
            <form className="form-inline">
              <input
                className="form-control  mx-2 sm-2"
                type="text"
                placeholder="Search"
              />

              <button
                className="btn btn-outline-primary mx-2"
                type="button"
                onClick={() => handleOpen(0)}
              >
                Book
              </button>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <Login type={type} />
              </Modal>

              <button
                className="btn btn-outline-primary mx-2"
                type="button"
                onClick={() => handleOpen(1)}
              >
                Sell
              </button>

              {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <Login type={type} />
              </Modal> */}
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
                    Id={hotel.Id}
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

export default Home;
