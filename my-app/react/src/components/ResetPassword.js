import React, { useState } from "react";
import "../index.css";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {url,Address,Address2} from "./env"
export default function ResetPassword(){
    let k=0;
    const navigate=useNavigate();
    const [values,setvalues]=useState({Email:"",Password:""}) 
    const [otp,setotp]=useState(0);
    const [otp1,setotp1]=useState(0);
    const [verify,verifyotp]=useState(0)
    const generateError=(err)=>toast.error(err,{
        position:"bottom-right",
    });
    const SendOTP=async(e)=>{
        e.preventDefault();
        try{
            const {data} =await axios.get(`${url}/sendotp?params=${values.Email}`,{...values},{withCredentials:true});
            if(data){
                if(data.errors){
                    const {email,password}=data.errors;
                    if(email) generateError(email);
                    else if(password) generateError(password);
                }
                else{
                   setotp(data);
                  
                }
            }
        }catch(err){
        };
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data} =await axios.post(`${url}/UpdatePassword?param1=${values.Email}&param2=${values.Password}`,{...values},{withCredentials:true});
            if(data){
                if(data.errors){
                    const {email,password}=data.errors;
                    if(email) generateError(email);
                    else if(password) generateError(password);
                }
                else{
                }
            }
        }catch(err){
        };
        console.log("Successfully Changed")
        navigate("/")
    }
    return(
        <section className="vh-100">
            <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                     className="img-fluid" alt="Sample image"/>
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                {verify==0?<>
                    {otp==0?<>
                        <form  onSubmit={(e)=>SendOTP(e)}>
                            {/* Email input */}
                            <div className="form-outline mb-4">

                            </div>
                            <div className="form-outline mb-4">
                            <input type="text" id="user_id" className="form-control form-control-lg"
                                placeholder="Enter a valid Email Id" name="Email" onChange={(e)=>setvalues({...values,[e.target.name]:e.target.value})}/>
                            <label className="form-label" for="form3Example3">user-id</label>
                            </div>
                        </form>
                        <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg" onClick={SendOTP}>Send OTP</button>
                                {/* style="padding-left: 2.5rem; padding-right: 2.5rem;"  */}
                        </div>
                    </>:<>
                        <form  onSubmit={(e)=>SendOTP(e)}>
                        {/* Email input */}
                            <div className="form-outline mb-4">

                            </div>
                            <div className="form-outline mb-4">
                            <input type="text" id="user_id" className="form-control form-control-lg"
                                placeholder="Enter a valid Email Id" name="Email" value={values.Email} readOnly/>
                            <label className="form-label" for="form3Example3">user-id</label>
                            </div>
                            <div className="form-outline mb-4">
                            <input type="password" id="otp" className="form-control form-control-lg"
                                placeholder="Enter a valid OTP" name="OTP"  onChange={(e)=>setotp1(e.target.value)}/>
                            <label className="form-label" for="form3Example3">OTP</label>
                            {otp!=otp1?<p></p>:verifyotp(1)}
                            </div>
                        </form>
                        <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="button" className="btn btn-primary btn-lg" onClick={SendOTP}>Send OTP</button>
                        {/* style="padding-left: 2.5rem; padding-right: 2.5rem;"  */}
                </div>
                </>
                    }
                    
                </>:
                    <form  onSubmit={(e)=>handleSubmit(e)}>
                        {/* Email input */}
                        <div className="form-outline mb-4">

                        </div>
                        <div className="form-outline mb-4">
                        <input type="text" id="user_id" className="form-control form-control-lg"
                            placeholder="Enter a valid Email Id" name="Email" value={values.Email} readOnly/>
                        <label className="form-label" for="form3Example3">Email-id</label>
                        </div>
                    {/* Password input  */}
                        <div className="form-outline mb-3">
                        <input type="password" id="n2" class="form-control form-control-lg"
                            placeholder="Enter password" name="Password" onChange={(e)=>setvalues({...values,[e.target.name]:e.target.value})}/>
                        <label className="form-label" for="form3Example4">Password</label>
                        </div>
                        <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" className="btn btn-primary btn-lg">Reset Password</button>
                        {/* style="padding-left: 2.5rem; padding-right: 2.5rem;"  */}
                </div>
                        
                    </form>
                }
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