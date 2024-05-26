import {React, useState } from "react";
import './TopNavBar.css';
import { TonConnectButton } from "@tonconnect/ui-react";

function TopNavBar(props) {

    return (
    <div id="stats">
        <span id="totalTaps">Total Taps: {props.taps}</span> | <span> </span>
        <span id="balance">Balance: {props.balance} <span className="currency-symbol">B</span></span>
        <TonConnectButton />
    </div>
    )
}
export default TopNavBar;
