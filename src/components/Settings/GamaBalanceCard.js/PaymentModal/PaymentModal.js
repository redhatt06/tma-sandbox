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
import {
  Input,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  Grid,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import { formatEther, formatUnits } from "viem";
import {
  getTokenDecimals,
  shortenWeb3Address,
} from "../../../../utils/web3-utils";
import BigNumber from "bignumber.js";
import PolygonPayment from "./PolygonPayment";
import TonPayment from "./TonPayment";

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
          {successDetails.paymentTokenType === "TON"
            ? successDetails.paymentAmount
            : `Payment Amount: ${formatUnits(
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
        <p>Tx: {shortenWeb3Address(successDetails.txHash || "")}</p>
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
  const [successDetails, setSuccessDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});

  const initializePaymentMethod = async () => {
    if (network === "polygon") {
      const { isConnected } = getAccount(config);
      setIsWeb3Connected(isConnected);
    }
  };

  const resetStates = () => {
    setNetwork("polygon");
    setTransferMethod("direct");
    setIsWeb3Connected(false);
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
          setSuccessDetails(null);
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
                        {network === "polygon" ? (
                          <PolygonPayment
                            setSuccessDetails={setSuccessDetails}
                            setPaymentDetails={setPaymentDetails}
                            resetStates={resetStates}
                          />
                        ) : (
                          <TonPayment
                            setSuccessDetails={setSuccessDetails}
                            setPaymentDetails={setPaymentDetails}
                            resetStates={resetStates}
                          />
                        )}
                      </TabPanel>
                      <TabPanel value="web3">
                        {network === "polygon" ? (
                          <PolygonPayment
                            setSuccessDetails={setSuccessDetails}
                            setPaymentDetails={setPaymentDetails}
                            resetStates={resetStates}
                          />
                        ) : (
                          <TonPayment
                            setSuccessDetails={setSuccessDetails}
                            setPaymentDetails={setPaymentDetails}
                            resetStates={resetStates}
                          />
                        )}
                      </TabPanel>
                    </>
                  )}
                </div>
              </ModalBody>
            </TabContext>
            <ModalFooter className="flex justify-end items-center justify-center space-x-2 bg-modalBackground">
              <RadioGroup
                label="Choose Network"
                orientation="horizontal"
                value={network}
                onValueChange={setNetwork}
                className="flex justify-center">
                <Radio
                  value="polygon"
                  className="text-indigo-600">
                  Polygon
                </Radio>
                <Radio
                  value="ton"
                  className="text-indigo-600">
                  TON
                </Radio>
              </RadioGroup>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
