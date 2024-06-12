import { React, useState } from "react";
import { Avatar } from "@nextui-org/react";
import notcoinLogo from "../../assets/notcoinlogo.png";
import usdtLogo from "../../assets/tether.png";
import toncoinLogo from "../../assets/toncoinlogo.png";
import brinLogo from "../../assets/android-chrome-512x512.png";
import maticLogo from "../../assets/maticLogo.png";
import ethLogo from "../../assets/ethLogo.png";
const logoUrls = {
  ton: toncoinLogo,
  usdt: usdtLogo,
  not: notcoinLogo,
  matic: maticLogo,
  brin: brinLogo,
  eth: ethLogo,
};
function CoinLogo(props) {
  const url = logoUrls[props.icon];
  const symbol = props.symbol;

  return (
    <>
      {symbol ? (
        <div className="flex gap-4 items-center">
          <Avatar
            name="logo"
            src={url}
            size="sm"
          />
          <span>{symbol}</span>
        </div>
      ) : (
        <Avatar
          name="logo"
          src={url}
          size="sm"
        />
      )}
    </>
  );
}
export default CoinLogo;
