import React, { useEffect, useState,useRef} from "react";
import Web3 from "web3";
import ABI from "../TrufleAbi/ABI1.json"
import { useLocation, useNavigate } from "react-router-dom";
import ABI2 from "../TrufleAbi/ABI3.json"
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import axios from "axios";

export default function Manufacturer() {
    const [res, setRes] = useState([]);
    const [isRadio,setIsRadio]=useState(1);
    let account;
    let dt = 0,k=1;
    const { state } = useLocation();
    let x = state.user;
    const Address = "0x1Cd0C3b314F6619A5F469745f0761c4c108EfF6C";
    const Address2 = "0x505384bC73b1a9e1035D05fcd97D930C6ABD5DFb";
    const { ethereum } = window;
    let m=0;
    const HandleSubmit=async(e)=>{
        setIsRadio(e.target.value);
        k=e.target.value
        get();
    }
    async function get() {
        setRes([]);
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0];
        }
        window.web3 = await new Web3(ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        const data = await window.contract.methods.getMyStructs().call();
        window.contract2 = await new window.web3.eth.Contract(ABI2, Address2);
        const z =await axios.get(`http://localhost:4000/Details?param1=ADST`);
        const z1 =await axios.get(`http://localhost:4000/Details?param1=DDST`);
        const y=z.data;
        const y1=z1.data;
        const d1 = await window.contract2.methods.getMyStructs().call();
        let l, c = 1, n, count = 0, f;
        if(k==1){
            for (let i = 0; i < data.length; i++) {
                c = 1;
                count = 0;
                f = 0;
                if (data[i][5] !== "Approved") {
                    if (data[i][4]=="manufacturer") {
                            if (!res.includes(data[[i]])) {
                                setRes((prev) => [...prev, data[i]]);
                                m++;
                            }
                    }
                }
            }
        }else{
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
    const tableRef = useRef();
    useEffect(() => {
        if (res.length > 0) {
        $(tableRef.current).DataTable();
        }
    }, [res]);

    const Approve = async (i) => {
        if (window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0];
        }
        window.web3 = await new Web3(ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);

        await window.contract.methods.Approve(i, x).send({ from: state.Account  })
        .then(async(result)=>{
            await axios.post("http://localhost:4000/TransactionHistory",{"userId":state.user,"ReqId":i,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Approved","gas":result.gasUsed},{withCredentials:true});
         })
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
            await axios.post("http://localhost:4000/TransactionHistory",{"userId":state.user,"ReqId":k,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Sent Goods","gas":result.gasUsed},{withCredentials:true});
         })
        get();
    }
    return (
            <div className="container">
                <div id="Nodata"></div>
                <input type="radio" id="m1" name="fav_language" value={1} onChange={(e)=>HandleSubmit(e)}/>
                <label for="m1"> Recieved Requests</label>
                <input type="radio" id="m2" name="fav_language" value={2} onChange={(e)=>HandleSubmit(e)}/>
                <label for="m2"> Pending Requests</label><br/>
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
                <table id="ex1"  className="table table-striped "ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Sent To</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Approve</th>
                        </tr>
                    </thead>
                    <tbody id="tablebody">

                        {res.map((data, index) => (
                            <tr key={index}>
                                <td>{data[0]}</td>
                                <td>{data[1]}</td>
                                <td>{data[2]}</td>
                                <td>{data[3]}</td>
                                <td>{data[5]}</td>
                                {data[5]!=="Approved"?  
                                <td>
                                    <button type="button" className="btn btn-outline-success" onClick={() => Approve(data[6])}>
                                        Approve
                                    </button>
                                </td>:
                                <td>
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