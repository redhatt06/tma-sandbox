import React, { useState, useEffect } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
  Snippet,
} from "@nextui-org/react";
import { PriceApi } from "../../../../api/payments/price-api-get";
import { useTonPayment } from "../../../../hooks/useTonPayment";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { PaymentApi } from "../../../../api/payments/payment-api-get";
import { parseEther } from "viem";
import BigNumber from "bignumber.js";
import { FormControl, Input, MenuItem, Select } from "@mui/material";

const tonTokenTypes = [{ value: "TON Coin", label: "TON Coin", icon: "🔵" }];

const baseSlippageByTokenType = {
  "TON Coin": "0.02",
};

export default function TonPayment({ setSuccessDetails, resetStates }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { makeTonPayment } = useTonPayment();
  const [tonPaymentTokenType, setTonPaymentTokenType] = useState("TON Coin");
  const [amount, setAmount] = useState("");
  const [usdPrice, setUsdPrice] = useState("0");
  const [estimatedCost, setEstimatedCost] = useState(undefined);
  const [contractAmountConfirmed, setContractAmountConfirmed] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amountOfXToken: 0,
    totalCost: 0,
    paymentTokenType: "TON Coin",
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setAmount(amount);
      const price = getXTokenPrice();
      const usdValue = price * 7;
      setUsdPrice(usdValue * Number(amount));
    }, 1000); // 1000ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [amount]);

  const getXTokenPrice = () => {
    return 0.00015;
  };

  const handleContractPay = async () => {
    const price = await getXTokenPrice();
    const usdValue = price * 7;

    setUsdPrice(usdValue.toString());

    setPaymentDetails({
      amountOfXToken: amount,
      totalCost: price * Number(amount),
      paymentTokenType: tonPaymentTokenType,
    });
    setContractAmountConfirmed(true);
  };

  const handleConfirmContract = async () => {
    try {
      const payment = await PaymentApi.createTonContractPayment({
        amountOfXToken: parseEther(amount).toString(),
      });
      const price = getXTokenPrice();
      await makeTonPayment(payment._id, amount);

      setSuccessDetails({
        amountOfXToken: payment.amountOfXToken,
        paymentAmount: price * Number(amount),
        paymentTokenType: "TON",
      });
      setPaymentDetails(undefined);
      onClose(); // Close modal after successful transaction
    } catch (err) {
      console.log(err);
    }
  };

  const handleAmountChange = async (currentAmount) => {
    setAmount(currentAmount);
  };

  return (
    <div className="flex flex-col gap-4 mt-8">
      <Button
        onClick={onOpen}
        className="max-w-fit bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md">
        Buy Game Tokens
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetStates();
          setSuccessDetails(null);
          setContractAmountConfirmed(false); // Reset this state when modal closes
        }}
        className="bg-modalBackground">
        <ModalContent className="p-6 rounded-lg shadow-lg">
          <ModalHeader className="flex flex-col gap-2 text-2xl font-semibold">
            <h1>Payment</h1>
          </ModalHeader>
          <ModalBody>
            {contractAmountConfirmed ? (
              <div className="text-center">
                {paymentDetails && (
                  <p className="text-sm text-primary">
                    Estimated price: {paymentDetails.totalCost}{" "}
                    {paymentDetails.paymentTokenType}
                  </p>
                )}
                <Button
                  onClick={handleConfirmContract}
                  className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md"
                  style={{ width: "100px", alignSelf: "center" }}>
                  Confirm
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 w-full">
                <div className="flex w-full space-x-2 items-center">
                  <Input
                    label={"Amount: "}
                    type="number"
                    value={amount}
                    sx={{ color: "white" }}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full p-2 rounded-md text-white"
                  />
                  <FormControl className="w-full">
                    <Select
                      value={tonPaymentTokenType}
                      onChange={(e) => {
                        setTonPaymentTokenType(e.target.value);
                        e.stopPropagation();
                      }}
                      MenuProps={{
                        disablePortal: true,
                        PaperProps: {
                          onMouseDown: (e) => e.stopPropagation(),
                        },
                      }}
                      className="w-full p-2 rounded-md text-sm"
                      sx={{
                        "& fieldset": {
                          borderRadius: "10px",
                          borderWidth: "1px",
                        },
                        color: "white",
                        border: "none",
                      }}>
                      {tonTokenTypes.map((token) => (
                        <MenuItem
                          key={token.value}
                          value={token.value}>
                          <span className="mr-2">{token.icon}</span>
                          {token.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <span className="text-sm text-secondary">
                  {amount ? `Equivalent to $${usdPrice}` : ""}
                </span>
                <span className="text-sm text-secondary">
                  {estimatedCost
                    ? `Estimated Cost: ${estimatedCost} ${tonPaymentTokenType}`
                    : ""}
                </span>
                <Button
                  onClick={handleContractPay}
                  className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md"
                  style={{ width: "100px", alignSelf: "flex-end" }}>
                  Contract Buy
                </Button>
              </div>
            )}
          </ModalBody>
          <ModalFooter className="flex justify-end space-x-2 bg-modalBackground"></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
