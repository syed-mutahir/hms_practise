import React from "react";
import "../index.css";
import Modal from "@material-ui/core/Modal";
import fire from "../firebase";
import BookingForm from "./BookingForm.jsx";
import EditForm from "./EditForm.jsx";

const db = fire.firestore();

const Card = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleDelete = () => {
    const selId = JSON.parse(localStorage.getItem("HMS_User")).Id;
    db.collection("hotels")
      .doc(props.Id)
      .delete()
      .then((res) => {
        db.collection("hotels")
          .get()
          .then((res) => {
            if (res.size > 0) {
              let newArr = [];
              res.forEach((doc) => {
                if(doc.data().sellerId ===  selId){
                  newArr.push(doc.data());
                }
              });
              props.handleAddedHotel(newArr);
            } else {
              props.handleAddedHotel([]);
            }
          })
          .catch((err) => {
            alert(err.message);
          });
      });
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 my-4">
      <div className="card shadow bg-white rounded ">
        <img className="card-img-top" src={props.imgSrc} />
        <div className="card-body">
          <h5 className="card-title">{props.hotelName}</h5>
          <p>
            <b>City:</b> {props.hotelCity} <br />
            <b>Address:</b> {props.hotelAddress} <br />
            <b>No of beds:</b> {props.hotelBeds} <br />
            <b>Room type:</b> {props.roomType} <br />
          </p>

          {props.screen && props.screen !== "Home" && (
            <>
              {props.screen && props.screen === "customer" && (
                <>
                  <button
                    className="btn btn-outline-primary my-2"
                    style={{ width: "100%" }}
                    type="submit"
                    onClick={handleOpen}
                  >
                    Book Now
                  </button>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <BookingForm
                      hotelName={props.hotelName}
                      sellerId={props.sellerId}
                    />
                  </Modal>
                </>
              )}
              {props.screen && props.screen === "seller" && (
                <>
                  <button
                    className="btn btn-outline-primary my-2"
                    type="submit"
                    style={{ width: "100%" }}
                    onClick={handleOpen1}
                  >
                    Edit
                  </button>
                  <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <EditForm
                      greetings="Edit"
                      image={props.imgSrc}
                      name={props.hotelName}
                      city={props.hotelCity}
                      address={props.hotelAddress}
                      hotelBeds={props.hotelBeds}
                      roomType={props.roomType}
                      Id={props.Id}
                      handleAddedHotel={(data) => {
                        setOpen1(false);
                        props.handleAddedHotel(data);
                      }}
                    />
                  </Modal>

                  <button
                    className="btn btn-outline-danger my-2"
                    type="button"
                    style={{ width: "100%" }}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
