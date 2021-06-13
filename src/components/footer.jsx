import React from "react";
import "../index.css";

const Footer = () => {
  return (
    <div>
      <div className="row footer mt-5 py-4">
        <div className="col-6 text-center line">
          <h4 className="text pt-3">Contact Information </h4>

          <p className="text mt-2">
            {" "}
            20# Kamil MAnsion More Street out Ram Road Pakistan Chowk Karchi
          </p>
          <p className="text">0322-2640966</p>
          <p className="text"> Khansasiraj@yahoo.com</p>
        </div>

        <div className="col-6 text-center line">
          <h4 className="text pt-3">For Queries</h4>

          <p className="text mt-2"> If You have any queries or concerns</p>
          <a href="mailto:khansasiraj@yahoo.com">
            <button className="btn btn-outline-warning mx-2" type="button">
              Mail Us
            </button>
          </a>
        </div>
      </div>

      <div className="row copyRight">
        <div className="container py-3 text-center">
          All copyrights are reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
