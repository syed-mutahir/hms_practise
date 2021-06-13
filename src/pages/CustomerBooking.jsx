import React, { useState,useEffect } from "react";
import "../index.css";
import fire from "../firebase";
import Footer from "../components/footer";
import { Link, Redirect } from "react-router-dom";
import BookingCard from "../components/bookingCard";

const db = fire.firestore();

const CustomerBooking = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [bookings, setBookings] = useState([]);


  useEffect(() => {

    const Id = JSON.parse(localStorage.getItem("HMS_User")).Id

    db.collection("bookings")
      .get()
      .then((res) => {
        if (res.size > 0) {
          let newArr = [];
          res.forEach((doc) => {
            if(doc.data().userId === Id){
              newArr.push(doc.data());
            }
          });
          setBookings(newArr);
        } else {
          setBookings([]);
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
          <div className="mt-5 badge">
            <h5 className="text-left">Current Bookings</h5>
          </div>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => {
              return (
                <BookingCard
                  hotelName={booking.hotelName}
                  name={booking.userName}
                  contact={booking.contact}
                  date={booking.Date}
                  cnic={booking.CNIC}
                  days={booking.noOfDays}
                  amount={booking.Amount}
                />
              );
            })
          ) : (
            <h1>No Data</h1>
          )}

          {/* <div className="mt-5 badge">
            <h5 className="text-left">Previous Bookings</h5>
          </div>
          <BookingCard
            hotelName="Pearl-Continental"
            name="abc"
            contact="1234"
            date="2-june-2013"
            cnic="75676465"
            days="2"
            amount="2400"
          /> */}
        </div>

        <Footer />
      </div>
    );
  }
};

export default CustomerBooking;
