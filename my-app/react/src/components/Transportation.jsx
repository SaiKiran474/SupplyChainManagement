import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar"
import { useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import ABI1 from "../TrufleAbi/ABI1.json"
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
export default function Transportation(){
    let account;
    const navigate=useNavigate();
    const [res, setRes] = useState([]);
    const { state } = useLocation();
    let x=state.user;
    const HandleTransportation=(i)=>{
        navigate("./"+i,{state:{"DD":state.DD,"user":state.user,"id":state.id,"Account":state.Account }})
    }
    const get = async () => {
        
        document.getElementById("user_name").innerHTML=`${x}`;
        let account;
        const ABI=ABI1;
        const Address = "0xFFd25E691AF85B458ac687F35c1918C9EA1ec46C";
        const { ethereum } = window;
        window.web3 = await new Web3(ethereum);
        if(window.ethereum !== "undefined"){
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            account = accounts[0];
        }
        window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        const data = await window.contract.methods.getMyStructs().call();
        for (let i = 0; i < data.length; i++) {
            
            if(x==data[i][0]  & data[i][5]=="Approved"){
                if (!res.includes(data[[i]])) {
                    setRes((prev) => [...prev, data[i]]);
                }
            }
        }
    }
    useEffect(() => {
        get();
    },[])
    const tableRef=useRef();
    useEffect(() => {
        if (res.length > 0) {
        $(tableRef.current).DataTable();
        }
    }, [res]);
       
    return(
        <div className="container">
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
            <table  className="table table-striped " ref={tableRef} > 
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
                <tbody id="tablebody">
				    {res.map((data, index) => (
                                
                                <tr key={index}>
                                    <td>{data[0]}</td>
                                    <td>{data[1]}</td>
                                    <td>{data[2]}</td>
                                    <td>{data[3]}</td>
                                    <td>{data[4]}</td>
                                    <td>
                                        <button type="button" onClick={(e)=>{HandleTransportation(data[6])}}>
                                        checkStatus
                                        </button>
                                    </td>
                                </tr>
                                
                            ))}	
                </tbody>
            </table>}
    </div>
    )


}