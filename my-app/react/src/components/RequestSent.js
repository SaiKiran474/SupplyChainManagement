import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import ABI1 from "../TrufleAbi/ABI1.json";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import {url,Address,Address2} from "./env"
export default function Request() {
  let account;
  const navigate = useNavigate();
  const [res, setRes] = useState([]);
  const [isRadio,setIsRadio]=useState(1);
  const tableRef = useRef();
  const { state } = useLocation();
  let x = state.user;

  let k=1
  const HandleSubmit=async(e)=>{
    setIsRadio(e.target.value);
    k=e.target.value
    get();
}
  const get = async () => {
    setRes([])
      let account;
      const ABI = ABI1;
      const { ethereum } = window;
      window.web3 = await new Web3(ethereum);
      if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        account = accounts[0];
      }
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      const data = await window.contract.methods.getMyStructs().call();
      for (let i = 0; i < data.length; i++) {
        if(k==1){
          if (x == data[i][0]) {
            if (!res.includes(data[[i]])) {
              setRes((prev) => [...prev, data[i]]);
            }
          }
        }
        else{
          if (x == data[i][4] && data[i][5]=="Approved") {
            if (!res.includes(data[[i]])) {
              setRes((prev) => [...prev, data[i]]);
            }
          }
        }
      }
    };
  useEffect(() => {
    get();
    
  }, []);
  useEffect(() => {
    if (res.length > 0) {
      $(tableRef.current).DataTable();
    }
  }, [res]);

  return (
    <>
      <div className="container">
      <input type="radio" id="m1" name="fav_language" value={1} onChange={(e)=>HandleSubmit(e)}/>
                <label for="m1" style={{marginRight:"20px"}}> My Requests</label>
                <input type="radio" id="m2" name="fav_language" value={2} onChange={(e)=>HandleSubmit(e)}/>
                <label for="m2">Requests Approved By Me</label><br/>
        {isRadio==1?
        
          <h6>My Requests</h6>:
          <h6>Requests Approved By Me</h6>
        }
        {res.length==0?
            <div class="row align-items-center g-lg-5 py-5">
                        <div class="col-lg-7 text-center text-lg-start">
                        <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">PENDING REQUESTS NOT AVAILABLE</h1>
                        <p class="col-lg-10 fs-4"></p>
                        </div>
                        <div class="col-md-10 mx-auto col-lg-5">
                        <div class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                        <p> WAITING FOR YOUR COMMAND MY BROTHER</p>
                                <img src="https://cdn.dribbble.com/users/4161631/screenshots/9511726/media/63ad021948f35bf9f89471e50c8b0610.jpg?compress=1&resize=1200x900&vertical=center" class="img-fluid " alt="..."/>
                            </div>
                            </div>
                    </div>
            :
        <table className="table table-striped"   ref={tableRef}>
          <thead>
            <tr>
              <th>Request Id</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Approved by</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {res.map((data) => (
              <tr key={data[6]}>
                <td>{data[0]} </td>
                <td>{data[1]} </td>
                <td>{data[2]}</td>
                <td>{data[3]}</td>
                <td>{data[4]}</td>
                {data[5]==="Approved"?
                <td>{data[7]}</td>:
                <td>{data[5]}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        }
      </div>
   </>
  );
}