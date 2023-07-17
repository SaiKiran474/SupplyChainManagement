import React, { useEffect, useState,useRef } from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import axios from "axios";
import "datatables.net"
import NavBar from "./NavBar";
import {url} from "./env"
export default function Transactions() {
    const [res, setRes] = useState([]);
    const { state } = useLocation();
    let x = state.user;
    const tableRef = useRef();
    useEffect(() => {
        if (res.length > 0) {
        $(tableRef.current).DataTable();
        }
    }, [res]);

    async function get() {
        setRes([])
        const z =await axios.get(`${url}/TransactionsHistory?param1=${x}`,{withCredentials:true});
        setRes(z.data)
    }
    useEffect(() => {
        get();
    }, []);
    return (
            <div>
                <NavBar/>
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
            <div className="container">
                <table id="ex1"  className="table table-striped " ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>TransactionID</th>
                            <th>To address</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody id="tablebody">
                        {res.map((data, index) => (
                            <tr key={index}>
                                <td>{data.ReqId}</td>
                                <td>{data.transactionhash}</td>
                                <td>{data.to}</td>
                                <td>{data.purpose}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>}
            </div>
        );
}
