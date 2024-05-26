import {React, useState } from "react";
import './TopNavBar.css';
import { TonConnectButton } from "@tonconnect/ui-react";

function TopNavBar(props) {

    return (
    <div id="stats">
        <div className="navbar-grid-container">
        <p>asd</p>
        <p className="text-long">Total Taps: {props.taps} | Balance: {props.balance} B</p> 
        <TonConnectButton style={{float:"right"}}/>
        </div>
       
    </div>
    )
}
export default TopNavBar;
