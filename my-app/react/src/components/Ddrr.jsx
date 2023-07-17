import React, { useEffect, useState,useRef } from "react";
import Web3 from "web3";
import ABI from "../TrufleAbi/ABI1.json"
import { useLocation, useNavigate } from "react-router-dom";
import ABI2 from "../TrufleAbi/ABI3.json"
import NavBar from "./NavBar";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import axios from "axios";
import "datatables.net"
import {url} from "./env"
export default function DDRR() {
    const [res, setRes] = useState([]);
    let account;
    let dt = 0,k=1;
    const [isRadio,setIsRadio]=useState(1);
    const { state } = useLocation();
    let x = state.user;
    const Address = "0x1Cd0C3b314F6619A5F469745f0761c4c108EfF6C";
    const Address2 = "0xa1264490C2dae405f5c2269dFBF618B692188e1B";
    const { ethereum } = window;
    let m=0;
    const tableRef = useRef();
    useEffect(() => {
        if (res.length > 0) {
        $(tableRef.current).DataTable();
        }
    }, [res]);
    const HandleSubmit=async(e)=>{
        setIsRadio(e.target.value);
        k=e.target.value
        get();
    }
    async function get() {
        setRes([]);
        let updatedRes=[];
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        }
        window.web3 = await new Web3(ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        const data = await window.contract.methods.getMyStructs().call();
        window.contract2 = await new window.web3.eth.Contract(ABI2, Address2);
        const z =await axios.get(`${url}/Details?param1=ADST`);
        const z1 =await axios.get(`${url}/Details?param1=DDST`);
        const y=z.data;
        const y1=z1.data;
        const d1 = await window.contract2.methods.getMyStructs().call();
        let l, c = 1, n, count = 0, f;
        if(k=='1'){
            for (let i = 0; i < data.length; i++) {
                c = 1;
                count = 0;
                f = 0;
                if (data[i][5] !== "Approved") {
                    for (let j = 0; j < y.length; j++) {
                        if (data[i][0] === y[j].Name) {
                            l = y[j].Id1;
                        }
                    }
                    for (let j = 0; j < y1.length; j++) {
                        if (l === y1[j].Id) {
                            l = y1[j].Name;
                        }
                        if (x === y1[j].Name) {
                            n = y1[j].Id;
                        }
                    }
                    for (let j = 0; j < y.length; j++) {
                        if (n === y[j].Id1) {
                            count++;
                        }
                    }
                    for (let j = 0; j < y.length; j++) {
                        if (n === y[j].Id1) {
                            for (let k = 0; k < d1.length; k++) {
                                if (d1[k][6] === y[j].Name && d1[k][5] === data[i][6]) {
                                    c++;
                                    f = 1;
                                }
                            }
                        }
                    }
                    if (data[i][5] === "ASC") {
                        count += 1;
                    }
                    if (c !== count) {
                        if (((l === x && data[i][4] !== x && data[i][4] !== "Approved") || data[i][5] === "ASC"&& data[i][4] !== x ) && f !== 1) {
                            if (!res.includes(data[[i]])) {
                                var arr=new Array(8);
                                arr[0]=data[i][0]; arr[1]=data[i][1]; arr[2]=data[i][2]; arr[3]=data[i][3]; arr[4]=data[i][4]; arr[5]=data[i][5]; arr[6]=data[i][6]; arr[7]="1"; 
                                updatedRes.push(arr);
                                
                                m++;
                            }

                            
                        }
                    }
                    else {
                        if ((((l === x) && (data[i][4] !== "ASC") && (data[i][5] !== "Approved")) || (data[i][5] === "ASC" && f !== 1))) {
                            // tabledata = tabledata + ` <tr>
                            // <td>${data[i][0]}</td>
                            // <td>${data[i][1]}</td>
                            // <td>${data[i][2]}</td>
                            // <td>${data[i][3]}</td>
                            // <td>${data[i][4]}</td>
                            // <td><button onClick='quote(${i})'>Forward To DGST</button></td>
                            // </tr> `;
                            if (!res.includes(data[i])) {
                                var arr=new Array(8);
                                arr[0]=data[i][0]; arr[1]=data[i][1]; arr[2]=data[i][2]; arr[3]=data[i][3]; arr[4]=data[i][4]; arr[5]=data[i][5]; arr[6]=data[i][6]; arr[7]="0"; 
                                updatedRes.push(arr);
                                dt++;
                                m++;
                            }
                        
                        }
                    }
                }
            }
            setRes(updatedRes)
        }
        else{
            let l,d,C=0;
            for (let i = 0; i < data.length; i++) {
                if(data[i][5]=="Approved" && data[i][4]===x && data[i][7]=="Approved"){
                    // if((data[i][0]!=x && d===l && f==0 && data[i][4]==d)|| data[i][5]=="ASC"&&data[i][0]!=x && d!=l&&f==0 ){
                    //     if (!res.includes(data[[i]])) {
                    setRes((prev) => [...prev, data[i]]);
                    C++;
                }
            }
        }
    }
    useEffect(() => {
        get();
        
    }, []);
    const Approve = async (i) => {
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0];
        }
        window.web3 = await new Web3(ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);

        await window.contract.methods.Approve(i, x).send({ from: state.Account  })
        .then(async(result)=>{
            await axios.post(`${url}/TransactionHistory`,{"userId":state.user,"ReqId":i,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Approved","gas":result.gasUsed},{withCredentials:true});
         })
        get();
    }
    const quote = async (i,k) => {
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0];
        }
        window.web3 = await new Web3(ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        const data = await window.contract.methods.getMyStructs().call();
        if (k === x) {
            await window.contract.methods.update(i, "ASC").send({ from: state.Account  })
            .then(async(result)=>{
                await axios.post(`${url}/TransactionHistory`,{"userId":state.user,"ReqId":i,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Forwarded to ASC","gas":result.gasUsed},{withCredentials:true});
             })
        }
        else {
            await window.contract.methods.update(i, x).send({ from: state.Account  })
            .then(async(result)=>{
                await axios.post(`${url}/TransactionHistory`,{"userId":state.user,"ReqId":i,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Forwarded to units","gas":result.gasUsed},{withCredentials:true});
             })
        }
        get();
    }
    const send=async(k)=>{
        if(window.ethereum !== "undefined"){
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            account = accounts[0];
        }
    window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        await window.contract.methods.UpdateStatus(k,"Sent") .send({ from: state.Account  })
        .then(async(result)=>{
            await axios.post(`${url}/TransactionHistory`,{"userId":state.user,"ReqId":k,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Sent Goods","gas":result.gasUsed},{withCredentials:true});
         })
        get();
    }
    return (
            <div className="container">
            <div id="Nodata" className="nav1">
                <input type="radio" id="m1" name="fav_language" className="pd" value={1} onChange={(e)=>HandleSubmit(e)}/>
                <label for="m1" style={{marginRight:"20px"}}> Recieved Requests</label>
                <input type="radio" id="m2" name="fav_language" value={2} onChange={(e)=>HandleSubmit(e)}/>
                <label for="m2"> Pending Requests</label><br/>
            </div>
            <br/>
            {isRadio==1?
                <h6>Recieved Requests</h6>:
                <h6>Pending Requests</h6>
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
                <table id="ex1"  className="table table-striped " ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Approve</th>
                        </tr>
                    </thead>
                    <tbody id="tablebody">

                        {res && res.map((data, index) => (
                            <tr key={index}>
                                <td>{data[6]}</td>
                                <td>{data[1]}</td>
                                <td>{data[2]}</td>
                                <td>{data[3]}</td>
                                <td>{data[5]}</td>
                                {data[5]!=="Approved"?  data[7]==="1"?
                                <td>
                                    <button type="button" className="btn btn-outline-success" onClick={() => Approve(data[6])}>
                                        Approve
                                    </button>

                                    <button type="button" className="btn btn-outline-secondary" onClick={() => quote(data[6],data[4])}>
                                        Forward To Units
                                    </button>
                                </td>:
                                <td>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => quote(data[6],data[4])}>
                                        Forward To DGST
                                </button>
                                </td>:<td>
                                        <button type="button" className="btn btn-outline-success" onClick={() => send(data[6])}>
                                            Send Goods
                                        </button>
                                    </td>}
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
                }
            </div>
        );
}
