import React, { useEffect,useRef,useState } from "react";
import Web3 from "web3";
import ABI from "../TrufleAbi/ABI1.json"
import { useLocation} from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import ABI2 from "../TrufleAbi/ABI3.json"
import axios from "axios";
import {url} from "./env"
export default function ADRR(){
    const [res, setRes] = useState([]);
    const [isRadio, setIsRadio] = useState(1);
    let account;
    const {state}=useLocation();
    let x=state.user;
    const Address= "0xFFd25E691AF85B458ac687F35c1918C9EA1ec46C";
    const Address2="0xa1264490C2dae405f5c2269dFBF618B692188e1B";
    let C=0;
    let k=1;
    useEffect(() => {
        get();
      }, [])
    const tableRef = useRef();
    useEffect(() => {
        if (res.length > 0) {
            $(tableRef.current).DataTable();
        }
    }, [res]);
    const { ethereum } = window;
    const HandleSubmit=async(e)=>{
        setIsRadio(e.target.value);
        k=e.target.value
        get();
    }
    const get = async () => {
        setRes([]);
        window.web3 = await new Web3(ethereum);
        if(window.ethereum !== "undefined"){
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
        }
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        const data = await window.contract.methods.getMyStructs().call();
        window.contract2 = await new window.web3.eth.Contract(ABI2, Address2);
        const z =await axios.get(`${url}/Details?param1=ADST`,{withCredentials:true});
        const z1 =await axios.get(`${url}/Details?param1=DDST`,{withCredentials:true});
        const y=z.data;
        const y1=z1.data;
        const d1=await window.contract2.methods.getMyStructs().call();
        if(k=='1'){
                let l,d,C=0;
                    for(let j=0;j<y.length;j++){
                        if(x==y[j].Name){
                            d=y[j].Id1;
                        }
                    } 
                    for(let j=0;j<y1.length;j++){
                        if(d==y1[j].Id){
                            d=y1[j].Name;
                        }
                    }
                for (let i = 0; i < data.length; i++) {
                    if(data[i][5]!=="Approved"){
                    let f=0;
                    for(let j=0;j<y.length;j++){
                        if(data[i][0]==y[j].Name){
                            l=y[j].Id1;
                        }
                    }
                    for(let j=0;j<y1.length;j++){
                        if(l==y1[j].Id){
                            l=y1[j].Name;
                        }
                    }
                    for(let m=0;m<d1.length;m++){
                        if(d1[m][5]==data[i][6] && d1[m][6]==x){
                            f=1;
                        }
                    }
                    if((data[i][0]!=x && d===l && f==0 && data[i][4]==d)|| data[i][5]=="ASC"&&data[i][0]!=x && d!=l&&f==0 ){
                        if (!res.includes(data[[i]])) {
                            setRes((prev) => [...prev, data[i]]);
                            C++;
                        }
                        
                    }}
                }
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
    //     if(C==0){
    //         
    //     }
    // document.getElementById("tablebody").innerHTML = tabledata
    }
    const quote=async(k)=>{
        if(window.ethereum !== "undefined"){
                const accounts = await ethereum.request({method: "eth_requestAccounts"});
                account = accounts[0];
            }
        window.web3 = await new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            const data = await window.contract.methods.getMyStructs().call();
            window.contract2=await new window.web3.eth.Contract(ABI2,Address2)
            var arr = new Array(7);
            for(let i=0;i<data.length;i++){
                if(data[i][6]===k){
                    arr[0]=data[i][0];
                    arr[1]=data[i][1];
                    arr[2]=data[i][2];
                    arr[3]=data[i][3];
                    arr[4]="Approved";
                    arr[5]=data[i][6];
                    arr[6]=x;
                }
            }
           
            // window.contract = await new window.web3.eth.Contract(ABI, Address);
            await window.contract.methods.Approve(k,x) .send({ from: state.Account })
            .then(async(result)=>{
                await axios.post(`${url}/TransactionHistory`,{"userId":state.user,"ReqId":arr[5],"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":arr[4],"gas":result.gasUsed},{withCredentials:true});
             })
            get();
    }
    const reject=async(k)=>{
        if(window.ethereum !== "undefined"){
                const accounts = await ethereum.request({method: "eth_requestAccounts"});
                account = accounts[0];
            }
        window.web3 = await new Web3(ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        window.contract2=await new window.web3.eth.Contract(ABI2,Address2)
        const data = await window.contract.methods.getMyStructs().call();
        var arr = new Array(7);
        for(let i=0;i<data.length;i++){
                if(data[i][6]===k){
                arr[0]=data[i][0];
                arr[1]=data[i][1];
                arr[2]=data[i][2];
                arr[3]=data[i][3];
                arr[4]="Rejected";
                arr[5]=data[i][6];
                arr[6]=x;
                }
            }
            await window.contract2.methods.push_element(arr).send({ from: account })
            .then(async(result)=>{
                await axios.post(`${url}/TransactionHistory`,{"userId":state.user,"ReqId":arr[5],"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":arr[4],"gas":result.gasUsed},{withCredentials:true});
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
        await window.contract.methods.UpdateStatus(k,"Sent") .send({ from: account })
        .then(async(result)=>{
            await axios.post(`${url}/TransactionHistory`,{"userId":state.user,"ReqId":k,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Sent Goods","gas":result.gasUsed},{withCredentials:true});
         })
        get();
    }
    return(
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
            <>
            <table  className="table table-striped " ref={tableRef}>
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
                {res && res.map((data) => (
                                
                                <tr key={data[6]}>
                                    <td>{data[0]}</td>
                                    <td>{data[1]}</td>
                                    <td>{data[2]}</td>
                                    <td>{data[3]}</td>
                                    <td>{data[4]}</td>
                                    {data[5]!=="Approved"?  
                                    <td>
                                                             
                                        <button type="button" className="btn btn-outline-success me-2" onClick={() => quote(data[6])}>
                                            Accept
                                        </button>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => reject(data[6])}>
                                            Reject
                                        </button>
                                    </td>:
                                    <td>
                                        <button type="button" className="btn btn-outline-success" onClick={() => send(data[6])}>
                                            Send Goods
                                        </button>
                                    </td>
                                    }
                                </tr>
                                
                            ))}
                </tbody>
            </table>
            </>
            }
        </div>
    )
}