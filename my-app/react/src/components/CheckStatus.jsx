import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import ABI1 from "../TrufleAbi/ABI1.json"
import Progressbar from "./ProgressBar";
import {url,Address,Address2} from "./env"
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";
export default function CheckStatus(){
    const Params=useParams();
    const [res, setRes] = useState([]);
    useEffect(() => {
      get();
  }, [])
    const get = async () => {
        setRes([]);
        let account;
        const ABI=ABI1;
        const { ethereum } = window;
        window.web3 = await new Web3(ethereum);
        if(window.ethereum !== "undefined"){
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
        }
        window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        const data = await window.contract.methods.getMyStructs().call();
    var tabledata = "";
    for (let i = 0; i < data.length; i++) {
        if(Params.req_id==data[i][6]){
            if (!res.includes(data[[i]])) {
                setRes((prev) => [...prev, data[i]]);
            }
        }
    }
    }
    if(res.length!==0){
    return(
        <>
        <section className="vh-100" style={{ backgroundColor: "#8c9eff" }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol size="12">
                <MDBCard
                  className="card-stepper text-black"
                  style={{ borderRadius: "16px" }}
                >
                  <MDBCardBody className="p-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <div>
                        <MDBTypography tag="h5" className="mb-0">
                          INVOICE{" "}
                          <span className="text-primary font-weight-bold">
                            #Y34XDHR
                          </span>
                        </MDBTypography>
                      </div>
                      <div className="text-end">
                        <p className="mb-0">
                          Expected Arrival <span>01/12/19</span>
                        </p>
                        {res!=[]?
                          <p className="mb-0">
                            USPS{res[0][6]}
                          </p>
                        :""}
                      </div>
                    </div>
                    <ul
                      className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2" >
                        {res[0][5]!="Approved"?
                            <Progressbar bgcolor="#99ccff" progress='1'  height={30}  />
                        :""}
                        {res[0][7]=="Approved"?
                            <Progressbar bgcolor="#99ccff" progress='33.33'  height={30}  />
                        :""}
                        {res[0][7]=="Sent"?
                            <Progressbar bgcolor="#99ccff" progress='66.66'  height={30}  />
                        :""}
                        {res[0][7]=="Recieved"?
                            <Progressbar bgcolor="#99ccff" progress='100'  height={30}  />
                        :""}
                     {/* <li> <Progressbar bgcolor="#99ccff" progress='100'  height={30} /></li> 
                      <li><Progressbar bgcolor="#99ccff" progress='100'  height={30} /></li> 
                      <li><Progressbar bgcolor="#99ccff" progress='10'  height={30} /></li>  */}
                    </ul>
  
                    <div className="d-flex justify-content-between">
                      <div className="d-lg-flex align-items-center">
                        <MDBIcon fas icon="clipboard-list me-lg-4 mb-3 mb-lg-0" size="3x" />
                        <div>
                          <p className="fw-bold mb-1">Order</p>
                          <p className="fw-bold mb-0">Processed</p>
                        </div>
                      </div>
                      <div className="d-lg-flex align-items-center">
                        <MDBIcon fas icon="box-open me-lg-4 mb-3 mb-lg-0" size="3x" />
                        <div>
                          <p className="fw-bold mb-1">Order</p>
                          <p className="fw-bold mb-0">Shipped</p>
                        </div>
                      </div>
                      <div className="d-lg-flex align-items-center">
                        <MDBIcon fas icon="shipping-fast me-lg-4 mb-3 mb-lg-0" size="3x" />
                        <div>
                          <p className="fw-bold mb-1">Order</p>
                          <p className="fw-bold mb-0">En Route</p>
                        </div>
                      </div>
                      <div className="d-lg-flex align-items-center">
                        <MDBIcon fas icon="home me-lg-4 mb-3 mb-lg-0" size="3x" />
                        <div>
                          <p className="fw-bold mb-1">Order</p>
                          <p className="fw-bold mb-0">Arrived</p>
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </>
    );
  }
    
}