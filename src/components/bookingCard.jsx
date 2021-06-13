import React from 'react';
import '../index.css';

const BookingCard = (props) =>{
    return(
        <div className="card shadow bg-white rounded mt-3">
            <h5 className="card-header">{props.hotelName}</h5>

            <div className="card-body">
                <p className="card-text">
                    <b>Name : </b> {props.name} <br />
                    <b>Contact : </b> {props.contact} <br />
                    <b>Date : </b> {props.date} <br />
                    <b>CNIC : </b> {props.cnic} <br />
                    <b>No of days : </b> {props.days} <br />
                    <b>Amount : </b> {props.amount} <br />
                </p>
                </div>
        </div>
    );
};

export default BookingCard;