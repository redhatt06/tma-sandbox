import { React, useContext, useState } from "react";
import "./TopNavBar.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import CoinLogo from "../CoinLogo/CoinLogo";
import { AuthContext } from "../../context/AuthContext";
import { formatEther } from "viem";
import BigNumber from "bignumber.js";
function TopNavBar(props) {
  const { user } = useContext(AuthContext);
  return (
    <Navbar>
      {/* <NavbarBrand>
        <CoinLogo icon={"brin"} />
        <p className="font-bold text-inherit">Bringold</p>
      </NavbarBrand> */}
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center">
        {/* <NavbarItem isActive>Total Taps: {props.taps} |</NavbarItem> */}
        <NavbarItem isActive>
          Balance: {formatEther(BigNumber(user.balance))} X
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <TonConnectButton style={{ float: "right" }} />
        </NavbarItem>
        <NavbarItem>
          <w3m-button />
        </NavbarItem>
        <NavbarItem isActive>username: {user.username} </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
export default TopNavBar;
