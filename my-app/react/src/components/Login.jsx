import React, { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Log() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({ Id: "", Password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`https://blockchainscm.onrender.com/Login?param1=${values.Id}&param2=${values.Password}`, {
        withCredentials: true,
      });
      console.log(data);
      if (data) {
        if (data==="Invalid Password" || data==="Invalid User Id") {
          if (data==="Invalid User Id") showError("Invalid User Id");
          else showError("Invalid Password" );
        } else {
          if (data.Role === "ADST") {
            navigate("/" + data.Name, { state: { DD: data.Role, user: data.Name, id: data.Id, Account: data.Account } });
          } else if (data.Role === "DDST") {
            navigate("/" + data.Name, { state: { DD: data.Role, user: data.Name, id: data.Id, Account: data.Account } });
          } else if (data.Role === "DGST") {
            navigate("/" + data.Name, { state: { DD: data.Role, user: data.Name, id: data.Id, Account: data.Account } });
          } else if(data.Role === "MANUFACTURER") {
            navigate("/" + data.Name, { state: { DD: data.Role, user: data.Name, id: data.Id, Account: data.Account } });
          }
        }
      }
    } catch (err) {
      showError("An error occurred");
    }
  };

  const showError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    });
  };
    return(
        <section className="vh-100">
            <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                     className="img-fluid" alt="Sample image"/>
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form  onSubmit={(e)=>handleSubmit(e)}>
                    {/* Email input */}
                    <div className="form-outline mb-4">

                    </div>
                    <div className="form-outline mb-4">
                    <input type="text" id="user_id" className="form-control form-control-lg"
                        placeholder="Enter a valid user Id" name="Id" onChange={(e)=>setvalues({...values,[e.target.name]:e.target.value})}/>
                    <label className="form-label" for="form3Example3">user-id</label>
                    </div>
                {/* Password input  */}
                    <div className="form-outline mb-3">
                    <input type="password" id="n2" class="form-control form-control-lg"
                        placeholder="Enter password" name="Password" onChange={(e)=>setvalues({...values,[e.target.name]:e.target.value})}/>
                    <label className="form-label" for="form3Example4">Password</label>
                    </div>
                    <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg">Login</button>
                        {/* style="padding-left: 2.5rem; padding-right: 2.5rem;"  */}
                    </div>
                    <a href="/ResetPassword">Forgot Password</a>
                <ToastContainer/>
                </form>
                
                </div>
                
            </div>
            </div>
            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

            <div className="text-white mb-3 mb-md-0">
                Copyright © 2023. All rights reserved.
            </div>
            </div>
         </section>
    )
    
}
