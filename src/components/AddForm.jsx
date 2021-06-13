import React from 'react';
import '../index.css';
import logo from '../images/logo.png';
import TextField from '@material-ui/core/TextField';


const AddForm = () =>{
    return(
        <div className="login">
            <div className="col-lg-4 col-md-5 col-8 shadow bg-white rounded my-5">
                <form className="loginCard my-4">
                    <img className="loginLogo" src={logo} />
                    <p className="mt-2">Book Now!!</p>

                    <TextField id="outlined-size-small" size="small" label="Name" variant="outlined" className="my-2" />
                    <TextField id="outlined-size-small" size="small" label="CNIC" variant="outlined" className="my-2"/>
                    <TextField id="outlined-size-small" size="small" label="Date" variant="outlined" className="my-2"/>
                    <TextField id="outlined-size-small" size="small" label="Contact No" variant="outlined" className="my-2"/>
                    <TextField id="outlined-size-small" size="small" label="Amount" variant="outlined" className="my-2"/>
                    <TextField id="outlined-size-small" size="small" label="No of days" variant="outlined" className="my-2"/>
                    
                    <button className="btn btn-block btn-outline-primary mt-2" type="button" style={{width : "56%"}}>Submit</button>
                </form>

            </div>
        </div>
    );
};

export default AddForm;