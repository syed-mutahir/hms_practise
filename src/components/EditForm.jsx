import React, { useState, useEffect } from "react";
import "../index.css";
import logo from "../images/logo.png";
import fire from "../firebase";
import TextField from "@material-ui/core/TextField";

const db = fire.firestore();
const storage = fire.storage().ref();

const EditForm = (props) => {
  const [name, setName] = useState(props.name || "");
  const [city, setCity] = useState(props.city || "");
  const [address, setAddress] = useState(props.address || "");
  const [noOfBeds, setNoOfBeds] = useState(props.hotelBeds || "");
  const [roomType, setRoomType] = useState(props.roomType || "");
  const [image, setImage] = useState(props.image || "");
  const [fileUploaded, setFileUploaded] = useState(true);

  const handleUploadImage = (e) => {
    const file = Date.now() + "-" + e.target.files[0].name;

    var upload = storage.child(`images/${file}`).put(e.target.files[0]);

    setFileUploaded(false);
    upload.on(
      "state_changed",
      (snapShot) => {},
      (err) => {
        alert(err.message);
        setFileUploaded(true);
      },
      () => {
        storage
          .child(`images/${file}`)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImage(fireBaseUrl);
            setFileUploaded(true);
          })
          .catch((err) => {
            alert(err);
            setFileUploaded(true);
          });
      }
    );
  };

  const handleAddService = () => {
    const selId = JSON.parse(localStorage.getItem("HMS_User")).Id;
    if (
      name.trim() === "" ||
      city.trim() === "" ||
      address.trim() === "" ||
      noOfBeds.trim() === "" ||
      roomType.trim() === "" ||
      image === ""
    ) {
      alert("Please fill all fields or upload image");
    } else {
      const Id = props.Id || db.collection("hotels").doc().id;
      db.collection("hotels")
        .doc(Id)
        .set({
          name,
          city,
          address,
          noOfBeds,
          roomType,
          image,
          Id,
          sellerId: selId,
        })
        .then(() => {
          db.collection("hotels")
            .get()
            .then((res) => {
              const newArr = [];
              res.forEach((doc) => {
                if(doc.data().sellerId ===  selId){
                  newArr.push(doc.data());
                }
              });
              props.handleAddedHotel(newArr);
            })
            .catch((err) => {
              alert(err.message);
            });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <form className="col-lg-4 col-md-5 col-8 shadow bg-white rounded formCard my-5 py-5">
      <img className="loginLogo" src={logo} />
      <p className="mt-2">{props.greetings}</p>

      <TextField
        id="outlined-size-small"
        size="small"
        label="Hotel-Name"
        variant="outlined"
        className="my-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="outlined-size-small"
        size="small"
        label="City"
        variant="outlined"
        className="my-2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        id="outlined-size-small"
        size="small"
        label="Address"
        variant="outlined"
        className="my-2"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextField
        id="outlined-size-small"
        size="small"
        label="No of Beds"
        variant="outlined"
        className="my-2"
        value={noOfBeds}
        onChange={(e) => setNoOfBeds(e.target.value)}
      />
      <TextField
        id="outlined-size-small"
        size="small"
        label="Room-Type"
        variant="outlined"
        className="my-2"
        value={roomType}
        onChange={(e) => setRoomType(e.target.value)}
      />

      <input
        type="file"
        id="img"
        accept="image/*"
        className="mt-2 ml-5 mb-0"
        onChange={handleUploadImage}
      ></input>
      <div className="w-100">
        {!fileUploaded && (
          <p
            className="ml-5"
            style={{
              color: "blue",
              fontSize: 10,
              margin: 0,
              textAlign: "left",
            }}
          >
            Image uploading...
          </p>
        )}
      </div>

      <button
        className="btn btn-block btn-outline-primary mt-4"
        type="button"
        style={{ width: "56%" }}
        onClick={handleAddService}
      >
        Done
      </button>
    </form>
  );
};

export default EditForm;
