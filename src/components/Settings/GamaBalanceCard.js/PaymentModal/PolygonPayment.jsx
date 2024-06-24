import React, { useEffect, useState } from "react";
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
import { useAccount } from "wagmi";
import { getAccount } from "wagmi/actions";
import { config } from "../../../../utils/wagmiConfig";
import { Input, Tabs, Tab, Select, MenuItem, FormControl } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import makePayment from "../../../../contract-functions/MakePayment";
import { PaymentApi } from "../../../../api/payments/payment-api-get";
import { PriceApi } from "../../../../api/payments/price-api-get";
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import approveTokens from "../../../../contract-functions/ApproveToken";
import { TokenAddressesBySymbol } from "../../../../utils/tokenConstants";
import { PaymentGateContract } from "../../../../smart-contracts/PaymentGate/PaymentGate";
import {
  getTokenDecimals,
  shortenWeb3Address,
} from "../../../../utils/web3-utils";
import BigNumber from "bignumber.js";
import { AuthApi } from "../../../../api/user-api";

const polygonTokenTypes = [
  { value: "MATIC", label: "MATIC", icon: "🟣" },
  { value: "USDT", label: "USDT", icon: "🟢" },
  { value: "BRIN", label: "BRIN", icon: "🟡" },
];

const tonTokenTypes = [
  { value: "TON Coin", label: "TON Coin", icon: "🔵" },
  { value: "USDT", label: "USDT", icon: "🟢" },
  { value: "NOT Coin", label: "NOT Coin", icon: "🟠" },
];
const baseSlippageByTokenType = {
  MATIC: "0.02",
  USDT: "0.1",
  BRIN: "10",
};

function SuccessScreen(props) {
  const { successDetails } = props;
  return (
    <div className="text-center text-primary">
      <h1>Success</h1>
      <p className="font-semibold text-primary">
        Tokens Purchased: {formatEther(successDetails.amountOfXToken)}{" "}
      </p>
      {successDetails.paymentAmount && (
        <p className="text-md font-mono mt-2 text-primary">
          {`Payment Amount: ${formatUnits(
            successDetails.paymentAmount,
            getTokenDecimals(successDetails.paymentTokenType)
          )} ${successDetails.paymentTokenType}`}
        </p>
      )}

      <Snippet
        variant="solid"
        color="white"
        codeString={successDetails.txHash}
        symbol=""
        size="sm">
        <p>Tx: {shortenWeb3Address(successDetails.txHash)}</p>
      </Snippet>
    </div>
  );
}

export default function PaymentModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();
  const [network, setNetwork] = useState("polygon");
  const [transferMethod, setTransferMethod] = useState("direct");
  const [isWeb3Connected, setIsWeb3Connected] = useState(false);
  const [directAmountConfirmed, setDirectAmountConfirmed] = useState(false);
  const [contractAmountConfirmed, setContractAmountConfirmed] = useState(false);
  const [polygonPaymentTokenType, setPolygonPaymentTokenType] =
    useState("MATIC");
  const [tonPaymentTokenType, setTonPaymentTokenType] = useState("TON Coin");
  const [amount, setAmount] = useState("");
  const [usdPrice, setUsdPrice] = useState("0");
  const [estimatedCost, setEstimatedCost] = useState(undefined);
  const [paymentDetails, setPaymentDetails] = useState({
    amountOfXToken: 0,
    totalCost: 0,
    paymentTokenType: "MATIC",
  });
  const [successDetails, setSuccessDetails] = useState(null);
  const [debouncedAmount, setDebouncedAmount] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAmount(amount);
    }, 1000); // 1000ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [amount]);

  const initializePaymentMethod = async () => {
    if (network === "polygon") {
      const { isConnected } = getAccount(config);
      setIsWeb3Connected(isConnected);
    }
  };

  const getXTokenPrice = async () => {
    return await PriceApi.getXtokenPrice();
  };

  const handleDirectPay = async () => {
    console.log("handleDirectPay called with network:", network);
    const tokenType =
      network === "polygon" ? polygonPaymentTokenType : tonPaymentTokenType;
    const price = await getXTokenPrice();
    const usdValue =
      BigNumber(formatUnits(price, "6").toString()) *
      BigNumber(amount.toString());
    setUsdPrice(usdValue);
    const paymentDetails = await PaymentApi.createDirectPayment({
      amountOfXToken: parseEther(amount).toString(),
      paymentTokenType: polygonPaymentTokenType,
    });
    const {
      userId,
      address,
      isValid,
      isSuccessful,
      amountOfXToken,
      paymentAmount,
      derivationPath,
      paymentTokenType,
    } = paymentDetails;

    setPaymentDetails({
      amountOfXToken,
      totalCost: formatUnits(paymentAmount, getTokenDecimals(paymentTokenType)),
      paymentTokenType,
      isSuccessful,
      address,
    });
    setDirectAmountConfirmed(true);
  };

  const handleContractPay = async () => {
    const tokenType =
      network === "polygon" ? polygonPaymentTokenType : tonPaymentTokenType;
    const price = await getXTokenPrice();
    const usdValue =
      BigNumber(formatUnits(price, "6").toString()) *
      BigNumber(amount.toString());

    const estimatedCost = await PriceApi.getEstimatedCost({
      paymentTokenType: polygonPaymentTokenType,
      amountOfXToken: parseEther(amount).toString(),
    });
    console.log("est:" + estimatedCost);
    setUsdPrice(usdValue.toString());

    setPaymentDetails({
      amountOfXToken: amount,
      totalCost: formatUnits(
        estimatedCost,
        getTokenDecimals(polygonPaymentTokenType)
      ),
      paymentTokenType: polygonPaymentTokenType,
    });
    setContractAmountConfirmed(true);
  };

  const handleAmountChange = async (currentAmount) => {
    setAmount(currentAmount);
  };
  useEffect(() => {
    const updateEstimatedCost = async () => {
      if (debouncedAmount) {
        const price = await getXTokenPrice();
        const usdValue =
          BigNumber(formatUnits(price, "6").toString()) *
          BigNumber(debouncedAmount.toString());
        setUsdPrice(usdValue.toString());

        const estimatedCost = await PriceApi.getEstimatedCost({
          paymentTokenType: polygonPaymentTokenType,
          amountOfXToken: parseEther(debouncedAmount).toString(),
        });
        setEstimatedCost(
          formatUnits(estimatedCost, getTokenDecimals(polygonPaymentTokenType))
        );
      } else {
        setUsdPrice("0");
        setEstimatedCost(undefined);
      }
    };

    updateEstimatedCost();
  }, [debouncedAmount, polygonPaymentTokenType]);

  const handleConfirmContract = async () => {
    try {
      const payment = await PaymentApi.createContractPayment({
        amountOfXToken: parseEther(amount).toString(),
      });
      const estimatedCost = await PriceApi.getEstimatedCost({
        paymentTokenType: polygonPaymentTokenType,
        amountOfXToken: parseEther(amount).toString(),
      });

      if (polygonPaymentTokenType !== polygonTokenTypes[0].value) {
        const approveAmount =
          parseUnits(
            formatUnits(
              estimatedCost,
              getTokenDecimals(polygonPaymentTokenType)
            ),
            getTokenDecimals(polygonPaymentTokenType)
          ) +
          parseUnits(
            baseSlippageByTokenType[polygonPaymentTokenType],
            getTokenDecimals(polygonPaymentTokenType)
          );

        const approvedToken = await approveTokens(
          TokenAddressesBySymbol.POLYGON[polygonPaymentTokenType].address,
          PaymentGateContract.address,
          approveAmount,
          address
        );
        if (!approvedToken) throw new Error("Token Approval Failed");
      }

      const paymentMade = await makePayment(
        payment._id,
        polygonPaymentTokenType,
        parseEther(amount).toString()
      );
      if (paymentMade) {
        setSuccessDetails({
          amountOfXToken: payment.amountOfXToken,
          paymentAmount: estimatedCost,
          paymentTokenType: "MATIC",
          txHash: paymentMade,
        });
        setPaymentDetails(undefined);
      } else {
        console.log("Failed");
      }
    } catch (err) {
      await AuthApi.postLog({ log: JSON.stringify(err) });
      console.log(err);
    }
  };

  const resetStates = () => {
    setNetwork("polygon");
    setTransferMethod("direct");
    setIsWeb3Connected(false);
    setDirectAmountConfirmed(false);
    setPolygonPaymentTokenType("MATIC");
    setTonPaymentTokenType("TON Coin");
    setAmount("");
    setUsdPrice("0");
    setContractAmountConfirmed(false);
  };

  useEffect(() => {
    initializePaymentMethod();
  }, [network]);

  return (
    <div className="flex flex-col gap-4 mt-8">
      <Button
        onPress={onOpen}
        className="max-w-fit bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md">
        Buy Game Tokens
      </Button>

      <Modal
        isOpen={isOpen}
        placement={"center"}
        onClose={() => {
          onClose();
          resetStates();
        }}
        className="bg-modalBackground">
        <ModalContent className="p-6 rounded-lg shadow-lg">
          <>
            <ModalHeader className="flex flex-col gap-2 text-2xl font-semibold">
              <h1>Payment</h1>
            </ModalHeader>
            <TabContext value={transferMethod}>
              <Tabs
                value={transferMethod}
                onChange={(e, value) => setTransferMethod(value)}
                className="mb-4"
                textColor="secondary"
                TabIndicatorProps={{ style: { backgroundColor: "#7ED55F" } }}>
                <Tab
                  value="direct"
                  label={"Direct Transfer"}
                  className="text-indigo-600 text-[#7ED55F]"></Tab>
                <Tab
                  value="web3"
                  label={"Web3 Wallet"}
                  className="text-indigo-600 text-[#7ED55F]"></Tab>
              </Tabs>
              <ModalBody>
                <div className="flex w-full flex-col bg-modalBackground">
                  {successDetails?.paymentTokenType ? (
                    <SuccessScreen successDetails={successDetails} />
                  ) : (
                    <>
                      <TabPanel value="direct">
                        <div className="flex flex-col items-center justify-center">
                          {!directAmountConfirmed ? (
                            <div className="flex flex-col items-center justify-center space-y-4 w-full">
                              <div className="flex w-full space-x-2 items-center">
                                <Input
                                  label={"Amount: "}
                                  type="number"
                                  value={amount}
                                  sx={{ color: "white" }}
                                  onChange={(e) =>
                                    handleAmountChange(e.target.value)
                                  }
                                  className="w-full p-2 rounded-md text-white"
                                />
                                <FormControl className="w-full">
                                  <Select
                                    value={
                                      network === "polygon"
                                        ? polygonPaymentTokenType
                                        : tonPaymentTokenType
                                    }
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (network === "polygon") {
                                        setPolygonPaymentTokenType(value);
                                      } else {
                                        setTonPaymentTokenType(value);
                                      }
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
                                    {(network === "polygon"
                                      ? polygonTokenTypes
                                      : tonTokenTypes
                                    ).map((token) => (
                                      <MenuItem
                                        key={token.value}
                                        value={token.value}>
                                        <span className="mr-2">
                                          {token.icon}
                                        </span>
                                        {token.label}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                              <span className="text-sm text-secondary">
                                {amount ? `Equivalent to $${usdPrice} USD` : ""}
                              </span>
                              <span className="text-sm text-secondary">
                                {estimatedCost
                                  ? `Estimated Cost: ${estimatedCost} ${polygonPaymentTokenType}`
                                  : ""}
                              </span>
                              <Button
                                onClick={handleDirectPay}
                                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md"
                                style={{
                                  width: "100px",
                                  alignSelf: "flex-end",
                                }}>
                                Buy
                              </Button>
                            </div>
                          ) : (
                            paymentDetails && (
                              <div className="text-center">
                                <p className="font-semibold">
                                  You must send {paymentDetails.amountOfXToken}{" "}
                                  {network === "polygon"
                                    ? paymentDetails.paymentTokenType
                                    : tonPaymentTokenType}{" "}
                                  to this address in 15 minutes
                                </p>
                                <p className="text-md font-mono mt-2">
                                  {paymentDetails.address}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </TabPanel>
                      <TabPanel value="web3">
                        <div className="flex items-center justify-center">
                          {network === "polygon" &&
                          transferMethod === "direct" ? (
                            <div className="text-center">
                              <p className="text-lg font-mono mt-2">
                                {paymentDetails?.address}
                              </p>
                            </div>
                          ) : network === "polygon" &&
                            transferMethod === "web3" ? (
                            <div className="flex flex-col items-center justify-center space-y-4">
                              {!contractAmountConfirmed ? (
                                <>
                                  <div className="flex flex-col items-center justify-center space-y-4">
                                    <w3m-button />
                                    <Input
                                      label={"Amount: "}
                                      type="number"
                                      value={amount}
                                      onChange={(e) =>
                                        setAmount(e.target.value)
                                      }
                                      className="w-full p-2 rounded-md bg-inputField"
                                      sx={{ color: "white" }}
                                    />
                                    <span className="text-sm text-gray-500">
                                      {amount ? `1 XToken= $${0.001} USD` : ""}
                                    </span>
                                    <FormControl className="w-full">
                                      <Select
                                        value={polygonPaymentTokenType}
                                        onChange={(e) => {
                                          setPolygonPaymentTokenType(
                                            e.target.value
                                          );
                                          e.stopPropagation();
                                        }}
                                        MenuProps={{
                                          disablePortal: true,
                                          PaperProps: {
                                            onMouseDown: (e) =>
                                              e.stopPropagation(),
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
                                        {polygonTokenTypes.map((token) => (
                                          <MenuItem
                                            key={token.value}
                                            value={token.value}>
                                            <span className="mr-2">
                                              {token.icon}
                                            </span>
                                            {token.label}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                    <span className="text-sm text-secondary">
                                      {amount
                                        ? `Equivalent to $${usdPrice} USD`
                                        : ""}
                                    </span>
                                    <span className="text-sm text-secondary">
                                      {estimatedCost
                                        ? `Estimated Cost: ${estimatedCost} ${polygonPaymentTokenType}`
                                        : ""}
                                    </span>
                                    <Button
                                      onClick={handleContractPay}
                                      className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md"
                                      style={{
                                        width: "100px",
                                        alignSelf: "flex-end",
                                      }}>
                                      Buy
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="text-center">
                                    <p className="font-semibold text-primary">
                                      Confirm Payment
                                    </p>
                                    <p className="text-lg text-primary">
                                      {amount} XToken
                                    </p>
                                    {paymentDetails && (
                                      <p className="text-sm text-primary">
                                        Estimated price:{" "}
                                        {paymentDetails.totalCost}{" "}
                                        {paymentDetails.paymentTokenType}
                                      </p>
                                    )}

                                    <Button
                                      onClick={handleConfirmContract}
                                      className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md"
                                      style={{
                                        width: "100px",
                                        alignSelf: "center",
                                      }}>
                                      Confirm
                                    </Button>
                                  </div>
                                </>
                              )}
                            </div>
                          ) : network === "ton" &&
                            transferMethod === "direct" ? (
                            <div className="text-center">
                              <p>TON Direct content</p>
                            </div>
                          ) : network === "ton" && transferMethod === "web3" ? (
                            <div className="text-center">
                              <p>TON Web3 content</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <p>Unexpected content</p>
                            </div>
                          )}
                        </div>
                      </TabPanel>
                    </>
                  )}
                </div>
              </ModalBody>
            </TabContext>
            <ModalFooter className="flex justify-end space-x-2 bg-modalBackground"></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
