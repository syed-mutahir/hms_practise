import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "../index.css";
import fire from "../firebase";
import Footer from "../components/footer";
import Card from "../components/card.jsx";
import Modal from "@material-ui/core/Modal";
import EditForm from "../components/EditForm";

const db = fire.firestore();
const storage = fire.storage();

const Seller = () => {
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {

    const Id = JSON.parse(localStorage.getItem("HMS_User")).Id;

    db.collection("hotels")
      .get()
      .then((res) => {
        if (res.size > 0) {
          let newArr = [];
          res.forEach((doc) => {
            if(doc.data().sellerId ===  Id){
              newArr.push(doc.data());
            }
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddedHotel = (data) => {
    setHotels(data);
    setOpen(false);
  };

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
              <Link to="/Seller">
                <button className="btn btn-outline-primary mx-2" type="button">
                  Home
                </button>
              </Link>
              <button
                className="btn btn-outline-primary mx-2"
                type="button"
                onClick={handleOpen}
              >
                Add Service
              </button>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <EditForm
                  handleAddedHotel={(data) => handleAddedHotel(data)}
                  greetings="Add Your Services!!"
                />
              </Modal>

              <Link to="/SellerBooking">
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
          <div className="mt-5 badge">
            <h5 className="text-left">Current Services</h5>
          </div>
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
                    screen="seller"
                    handleAddedHotel={(data) => handleAddedHotel(data)}
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

export default Seller;
