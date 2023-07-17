import React,{useState} from "react";
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
import  {toast} from "react-toastify";
export default function Register(){
    // const MongoRegister=async()=>{
    // }
    let c=0;
    const {state}=useLocation();
    const navigate=useNavigate();
    const [values,setValues]=useState({Name:"",Email:"",Id:"",Id1:"",Password:"",Role:"ADST",Account:""})
    const generateError=(err)=>toast.error(err,{
        position:"bottom-right",
    });
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            if(state.DD==="DDST"){
                setValues({...values,[e.target.Id1]:state.id})
            }
            const {data} =await axios.post("http://localhost:4000/Register",{...values},{withCredentials:true});
            if(data){
                if(data.errors){
                    const {email,password}=data.errors;
                    if(email) generateError(email);
                    else if(password) generateError(password);
                }
                else{
                    
                    document.getElementById("sub").innerHTML = `Successfully Registered.......`;
                }
            }
        }catch(err){console.log(err)};
        
    };
    return(
        <div>
            <form className="container" onSubmit={(e)=>handleSubmit(e)}>
                <p>Name:
                    <input type="text" placeholder="name" name="Name" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                </p>
                <p>Email:
                <input type="email" placeholder="email" name="Email" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                </p>
                <p>Role:
                {state.DD==="DDST"?<input type="text" placeholder="Role" value="ADST" name="Role" readOnly/>:<>
                    <input type="text" placeholder="Role" className="form-control small" list="browsers110" name="Role" id="n2" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                   
                        <datalist id="browsers110">
							<option value="DDST"/>
							<option value="MANUFACTURER"/>
						</datalist>
                        </>}
                </p>
                <p>ID:
                    <input type="number" placeholder="child" name="Id" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                </p>
                <p>Password:
                <input type="password" placeholder="password" name="Password" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                </p>
                <p>Account:
                <input type="text" placeholder="Account" name="Account" onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} required/>
                </p>
                <button type="submit">Register</button>
            </form>
            <h1 id="sub"></h1>
        </div>
        )
        
}