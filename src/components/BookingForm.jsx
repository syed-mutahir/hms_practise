import React, { useEffect, useState } from "react";
import "../index.css";
import logo from "../images/logo.png";
import fire from "../firebase";
import TextField from "@material-ui/core/TextField";

const db = fire.firestore();

const BookingForm = (props) => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState("");
  const [noOfDays, setNoOfDays] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("HMS_User"));
    if (data) {
      if (data.type === 0) {
        setUserId(data.Id);
      }
    }
  });

  const handleSubmitBooking = () => {
    if (
      (name,
      CNIC,
      date.trim() === "" ||
        contact.trim() === "" ||
        amount.trim() === "" ||
        noOfDays.trim() === "")
    ) {
      alert("Please fill all boxes");
    } else {
      db.collection("bookings")
        .add({
          userName: name,
          CNIC,
          Date: date,
          contact,
          Amount: amount,
          noOfDays,
          userId,
          hotelName: props.hotelName,
          sellerId: props.sellerId,
        })
        .then(() => {
          alert("Thank you for booking");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <form className="col-lg-4 col-md-5 col-8 shadow bg-white rounded formCard my-5 py-4">
      <img className="loginLogo" src={logo} />
      <p className="mt-2">Book Now!!</p>

      <TextField
        id="outlined-size-small"
        size="small"
        label="Name"
        variant="outlined"
        className="my-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="outlined-size-small"
        size="small"
        label="CNIC"
        variant="outlined"
        className="my-2"
        value={CNIC}
        onChange={(e) => setCNIC(e.target.value)}
      />
      <TextField
        id="outlined-size-small"
        size="small"
        label="Date"
        variant="outlined"
        className="my-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        id="outlined-size-small"
        size="small"
        label="Contact No"
        variant="outlined"
        className="my-2"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <TextField
        id="outlined-size-small"
        size="small"
        label="Amount"
        variant="outlined"
        className="my-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <TextField
        id="outlined-size-small"
        size="small"
        label="No of days"
        variant="outlined"
        className="my-2"
        value={noOfDays}
        onChange={(e) => setNoOfDays(e.target.value)}
      />

      <button
        className="btn btn-block btn-outline-primary mt-2"
        type="button"
        style={{ width: "56%" }}
        onClick={handleSubmitBooking}
      >
        Submit
      </button>
    </form>
  );
};

export default BookingForm;
