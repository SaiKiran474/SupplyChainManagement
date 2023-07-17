import React, { useState } from "react";
import NavBar from "./NavBar"
import { useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import ABI1 from "../TrufleAbi/ABI1.json"
import axios from "axios";
import {url} from "./env"
export default function Request(){
   
    var a1=[];
    var a2=[];
    const {state}=useLocation();
   const navigate=useNavigate();
    const multiple=()=>{
        var tabledata="";
        if(document.getElementById("n2").value!=="" && document.getElementById("n3").value!==""){
        a1.push(document.getElementById("n2").value);
        a2.push(document.getElementById("n3").value);
        }
        for (let i = 0; i < a1.length; i++) {
            tabledata = tabledata + ` <tr>         
            <td>${a1[i]}</td>
            <td>${a2[i]}</td>
            </tr> `;
        }
        document.getElementById("n2").value="";
        document.getElementById("n3").value="";
        // document.getElementById("t1").innerHTML = td;
        document.getElementById("tablebody").innerHTML = tabledata
    }
    const add=async()=>{
        const { ethereum } = window;
        var account;
        // const accounts = await ethereum.request({ method: 'eth_requestAccounts' }); 
        if(ethereum !== "undefined"){
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        account=accounts[0];
        }
    const ABI=ABI1;
    const Address = "0xFFd25E691AF85B458ac687F35c1918C9EA1ec46C";
    window.web3 = await new Web3(ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const m3 = document.getElementById("n4").value;
    // if(Acc.toLowerCase()!=account){
    //     document.getElementById("Total").innerHTML ="You are using a differnt account metamask \n use the account with this address "+`${Acc}`;
    // }
    // else{
        // const m4 = new Date().toLocaleDateString();
			const m5 = new Date().getTime();
            if(m3!=="" && a1!=[] && a2!=[]){
                await window.contract.methods.push_element(state.user,a1,a2,m3,"pending","pending",""+m5).send({ from: state.Account  })
                .then(async(result)=>{
                   await axios.post(`${url}/TransactionHistory`,{"userId":state.user,"ReqId":m5,"transactionhash":result.transactionHash,"from":result.from,"to":result.to,"purpose":"Request Placed","gas":result.gasUsed},{withCredentials:true});
                })
    // const data = await window.contract.methods.arr().call();
    document.getElementById("sub").innerHTML = `Request Placed successfully.......`;
    }
    
}
    return(
        <div >
            <center>
            <div className="form-group">
				<div className="row">
					<div className="col-lg-4">
						<label for="browser" className="form-label">Product name:</label><br/>
						<input type="text"  list="browsers2" name="browser" id="n2" required/>
						<datalist id="browsers2">
							<option value="Rice"/>
							<option value="Wheat"/>
							<option value="meat"/>
							<option value="milk"/>
							<option value="eggs"/>
							<option value="chana"/>
							<option value="carrot"/>
							<option value="beetroot"/>
							<option value="eggs"/>
						</datalist>
					</div>
					<div class="col-lg-4">
						<label for="browser" className="form-label">Quantity Required:</label><br/>
						<input type="number" name="quantity" placeholder="quantity" id="n3"/>
					</div>
					<div class="col-lg-4">
						<br/>
						<button onClick={multiple}>ADD MORE</button>
					</div>
				</div>
			</div>
            <br/>
            <br/>
            <table className="table container">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody id="tablebody">
                </tbody>
            </table>
			<div className="container">
					<label for="browser" className="form-label">DeadLine:</label><br/>
					<input type="date" name="date" placeholder="date" id="n4"/><br/><br/>
					<button onClick={add} className="btn btn-outline-success">Submit</button>
					<h3 className="container" id="sub"></h3>
			</div>
			<h3 className="container" id="Total"></h3>
            </center>
        </div>
    )
}
