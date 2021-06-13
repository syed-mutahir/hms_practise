import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import fire from "../firebase";
import "../index.css";
import logo from "../images/logo.png";

const db = fire.firestore();
const googlePrivider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

const Login = (props) => {
  const [sellerLogin, setSellerLogin] = useState(false);
  const [userLogin, setUserLogin] = useState(false);

  const handleFacebookLogin = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((res) => {
        const isNewUser = res.additionalUserInfo.isNewUser;
        const user = res.user;
        
        if (props.type === 1) {
          if (isNewUser) {
            db.collection("users")
              .add({
                name: user.displayName,
                email: user.email,
                Id: user.uid,
                type: 1,
              })
              .then(() => {
                localStorage.setItem(
                  "HMS_User",
                  JSON.stringify({ Id: user.uid, type: 1 })
                );
                setSellerLogin(true);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            db.collection("users")
              .where("Id", "==", user.uid)
              .get()
              .then((doc) => {
                doc.forEach((dt) => {
                  const type = dt.data().type;
                  if (type === 1) {
                    localStorage.setItem(
                      "HMS_User",
                      JSON.stringify({ Id: user.uid, type: 1 })
                    );
                    setSellerLogin(true);
                  } else {
                    alert("This email is already registered as a buyer");
                  }
                });
              });
          }
        } else {
          if (isNewUser) {
            db.collection("users")
              .add({
                name: user.displayName,
                email: user.email,
                Id: user.uid,
                type: 0,
              })
              .then(() => {
                localStorage.setItem(
                  "HMS_User",
                  JSON.stringify({ Id: user.uid, type: 0 })
                );
                setUserLogin(true);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            db.collection("users")
              .where("Id", "==", user.uid)
              .get()
              .then((doc) => {
                doc.forEach((dt) => {
                  const type = dt.data().type;
                  if (type === 0) {
                    localStorage.setItem(
                      "HMS_User",
                      JSON.stringify({ Id: user.uid, type: 0 })
                    );
                    setUserLogin(true);
                  } else {
                    alert("This email is already registered as a seller");
                  }
                });
              });
          }
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(googlePrivider)
      .then((res) => {
        const isNewUser = res.additionalUserInfo.isNewUser;
        const user = res.user;

        if (props.type === 1) {
          if (isNewUser) {
            db.collection("users")
              .add({
                name: user.displayName,
                email: user.email,
                Id: user.uid,
                type: 1,
              })
              .then(() => {
                localStorage.setItem(
                  "HMS_User",
                  JSON.stringify({ Id: user.uid, type: 1 })
                );
                setSellerLogin(true);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            db.collection("users")
              .where("Id", "==", user.uid)
              .get()
              .then((doc) => {
                doc.forEach((dt) => {
                  const type = dt.data().type;
                  if (type === 1) {
                    localStorage.setItem(
                      "HMS_User",
                      JSON.stringify({ Id: user.uid, type: 1 })
                    );
                    setSellerLogin(true);
                  } else {
                    alert("This email is already registered as a buyer");
                  }
                });
              });
          }
        } else {
          if (isNewUser) {
            db.collection("users")
              .add({
                name: user.displayName,
                email: user.email,
                Id: user.uid,
                type: 0,
              })
              .then(() => {
                localStorage.setItem(
                  "HMS_User",
                  JSON.stringify({ Id: user.uid, type: 0 })
                );
                setUserLogin(true);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            db.collection("users")
              .where("Id", "==", user.uid)
              .get()
              .then((doc) => {
                doc.forEach((dt) => {
                  const type = dt.data().type;
                  if (type === 0) {
                    localStorage.setItem(
                      "HMS_User",
                      JSON.stringify({ Id: user.uid, type: 0 })
                    );
                    setUserLogin(true);
                  } else {
                    alert("This email is already registered as a seller");
                  }
                });
              });
          }
        }
      })
      .catch((err) => {
        console.log("error=>", err);
      });
  };

  if (sellerLogin) {
    return <Redirect to="/Seller" />;
  } else if (userLogin) {
    return <Redirect to="/Customer" />;
  } else {
    return (
      <div className="col-lg-4 col-md-5 col-8 shadow bg-white rounded formCard my-5 py-5">
        <img className="loginLogo" src={logo} />
        <p className="mt-2">Login and Continue with our services!!</p>

        <button
          className="btn btn-block btn-outline-primary m-2 mx-5"
          type="button"
          style={{ width: "90%" }}
          onClick={handleFacebookLogin}
        >
          Continue With Facebook
        </button>
        <button
          className="btn btn-block btn-outline-danger  mx-5"
          type="button"
          style={{ width: "90%" }}
          onClick={handleGoogleLogin}
        >
          Continue With Google
        </button>
      </div>
    );
  }
};

export default Login;
