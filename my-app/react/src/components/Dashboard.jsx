import React, { useEffect } from "react";
import NavBar from "./NavBar"
import { useLocation,Link, useNavigate, Outlet } from "react-router-dom";
import "../index.css"
import url from "./env"
export default function Dashboard(){
    
    const navigate=useNavigate()
    const {state}=useLocation();
    useEffect(()=>{
        if(state==null){
            navigate("/");
        }
    },[])
    // return(
    //     <div>
    //     <NavBar/>
    //     HLOOOOOOOOOOOOOOOOOOOOO</div>
    // )
    if(state!==null){
    const RequestForSupplies=()=>{
        navigate("request",{state:{"DD":state.DD,"user":state.user,"id":state.id,"Account":state.Account}})
    }
    const RequestedSupplies=()=>{
        navigate("/"+state.user+"/RequestSent",{state:{"DD":state.DD,"user":state.user,"id":state.id,"Account":state.Account}})
    }
    const ADRR=()=>{
        navigate("adrr",{state:{"DD":state.DD,"user":state.user,"id":state.id,"Account":state.Account}})
    }
    const DDRR=()=>{
        navigate("/"+state.user+"/ddrr",{state:{"DD":state.DD,"user":state.user,"id":state.id,"Account":state.Account}})
    }
    const DGRR=()=>{
        navigate("/"+state.user+"/dgrr",{state:{"DD":state.DD,"user":state.user,"id":state.id,"Account":state.Account}})
    }
    const Register=()=>{
        navigate("/"+state.user+"/Register",{state:{"DD":state.DD,"user":state.user,"id":state.id,"Account":state.Account}})
    }
    const Transportation=()=>{
        navigate("/"+state.user+"/Transportation",{state:{"DD":state.DD,"user":state.user,"id":state.id,"Account":state.Account}})
    }
    const Manufacturer=()=>{
        navigate("/"+state.user+"/MRR",{state:{"DD":state.DD,"user":state.user,"id":state.id,"Account":state.Account}})
    }
    if(state.DD==="ADST"){
        return(
            <div className="text-center">
                <NavBar/>
                <div className="page">
                    <div className="nav ">
                        <a><button className="m-2 pb-2 btn btn-dark"  onClick={RequestForSupplies}>REQUEST FOR SUPPLIES </button></a>
                        <a><button  className="m-2 pb-2 btn btn-dark" onClick={ADRR}>RECIEVED REQUESTS</button></a>
                        <a><button  className="m-2 pb-2 btn btn-dark" onClick={Transportation} >STATUS OF A REQUEST</button></a>
                        <a><button  className="m-2 pb-2 btn btn-dark" onClick={RequestedSupplies}>ALL REQUESTS</button></a>
                    </div>
                    <Outlet />
                </div>
                
        </div>
        )
    }
     else if(state.DD=="DDST") {
        return(
            <div>
            <div className="text-center">
                <NavBar/>
                <div className="page">
                    <div className="navdg ">
                        <a><button className="m-2 pb-2 btn btn-dark"  onClick={RequestForSupplies}>REQUEST FOR SUPPLIES </button></a>
                        <a><button  className="m-2 pb-2 btn btn-dark" onClick={DDRR}>RECIEVED REQUESTS</button></a>
                        <a><button  className="m-2 pb-2 btn btn-dark" onClick={Transportation}  >STATUS OF A REQUEST</button></a>
                        <a><button  className="m-2 pb-2 btn btn-dark" onClick={RequestedSupplies}>ALL REQUESTS</button></a>
                        <a><button className="m-2 pb-2 btn btn-dark" onClick={Register}>REGISTER</button></a>
                    </div>
                    <Outlet />
                </div>
                </div>
        </div>
        )
    } 
    else if (state.DD==="DGST") {
        return(
            <div>
                <div className="text-center">
                <NavBar/>
                <div className="page">
                    <div className="navdg">
                        <a><button className="m-2 pb-2 btn btn-dark"  onClick={RequestForSupplies}>REQUEST FOR SUPPLIES </button></a>
                        <a><button  className="m-2 pb-2 btn btn-dark" onClick={DGRR}>RECIEVED REQUESTS</button></a>
                        <a><button  className="m-2 pb-2 btn btn-dark"  onClick={Transportation} >STATUS OF A REQUEST</button></a>
                        <a><button  className="m-2 pb-2 btn btn-dark" onClick={RequestedSupplies}>ALL REQUESTS</button></a>
                        <a><button className="m-2 pb-2 btn btn-dark" onClick={Register}>REGISTER</button></a>
                    </div>
                    <Outlet />
                </div>
                </div>
            </div>         
        )
    }   
    else {
        return(
            <div>
                <div className="text-center">
                <NavBar/>
                    <div className="page">
                        <div className="nav ">
                            <a><button  className="m-2 pb-800 btn btn-dark" onClick={Manufacturer}>RECIEVED REQUESTS</button></a>
                            <a><button  className="m-2 pb-800 btn btn-dark" onClick={Transportation}  >STATUS OF A REQUEST</button></a>
                        
                        </div>
                        <Outlet />
                    </div>
                </div>
                
            </div>
        )
    }
    }
}