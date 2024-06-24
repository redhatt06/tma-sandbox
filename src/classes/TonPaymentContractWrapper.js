const { TonConnectUI, useTonConnectUI } = require("@tonconnect/ui-react");

const { hexToBytes } = require("viem");
const TonWeb = require("tonweb");
const { Cell } = TonWeb.boc;

class TonPaymentContractWrapper {
  constructor(provider, options) {
    this.provider = provider;
    this.options = options;
    this.contractAddress = options.contractAddress;
    this.code = this.createCellChain(hexToBytes(options.contractCodeHex));
    this.wallet = options.wallet;
  }

  createCell(data) {
    const cell = new Cell();
    cell.bits.writeBytes(data);
    return cell;
  }

  createCellChain(bytes) {
    const maxBits = 1023; // maximum bits in a Cell
    const maxBytes = maxBits / 8; // maximum bytes in a Cell
    let currentCell = new Cell();
    let headCell = currentCell;
    for (let i = 0; i < bytes.length; i += maxBytes) {
      const chunk = bytes.slice(i, i + maxBytes);
      currentCell.bits.writeBytes(chunk);
      if (i + maxBytes < bytes.length) {
        const nextCell = new Cell();
        currentCell.refs.push(nextCell);
        currentCell = nextCell;
      }
    }
    return headCell;
  }

  async createMessageCell(
    senderAddress,
    queryId,
    amountOfXToken,
    paymentId,
    amount,
    fwdFee
  ) {
    const inMsgFullCell = new Cell();
    inMsgFullCell.bits.writeUint(0, 4); // flags
    inMsgFullCell.bits.writeAddress(new TonWeb.Address(senderAddress)); // sender address
    inMsgFullCell.bits.writeAddress(new TonWeb.Address(this.contractAddress)); // destination address
    // inMsgFullCell.bits.writeCoins(amount); // value
    inMsgFullCell.bits.writeBit(0); // skip extracurrency collection
    inMsgFullCell.bits.writeCoins(0); // skip ihr_fee
    // inMsgFullCell.bits.writeCoins(fwdFee); // forward fee

    const inMsgBodyCell = new Cell();
    inMsgBodyCell.bits.writeUint(queryId, 64);
    inMsgBodyCell.bits.writeUint(amountOfXToken, 64);
    inMsgBodyCell.bits.writeUint(paymentId, 64);

    return { inMsgFullCell, inMsgBodyCell };
  }

  async callMainFunction() {
    const senderAddress = this.options.senderAddress;
    const queryId = this.options.queryId;
    const amountOfXToken = this.options.amountOfXToken;
    const paymentId = this.options.paymentId;
    const amount = this.options.amount;
    const fwdFee = this.options.fwdFee;

    const { inMsgFullCell, inMsgBodyCell } = await this.createMessageCell(
      senderAddress,
      queryId,
      amountOfXToken,
      paymentId,
      amount,
      fwdFee
    );

    const inMsgFull = await inMsgFullCell.toBoc(false);
    const inMsgBody = await inMsgBodyCell.toBoc(false);
    const valCell = new Cell();

    valCell.bits.writeUint(13, 64);
    console.log((await valCell.toBoc(false)).toString("base64"));
    const result = await this.provider.sendTransaction({
      from: senderAddress,
      validUntil: Math.floor(Date.now() / 1000) + 100000,
      messages: [
        {
          payload: (await valCell.toBoc(false)).toString("base64"),
          address: this.contractAddress,
          amount: "100",
        },
      ],
    });

    return result;
  }

  fromWallet(params) {
    const transfer = (payloadPromise, needStateInit) => {
      const createPromise = async (amount) => {
        const stateInit = needStateInit
          ? (await this.createStateInit()).stateInit
          : null;
        const myAddress = await this.getAddress();
        const seqno = (await this.wallet.methods.seqno().call()) || 0;
        const payload = await payloadPromise;

        return this.wallet.methods.transfer({
          secretKey: params.secretKey,
          toAddress: myAddress.toString(true, true, true),
          amount: amount,
          seqno: seqno,
          payload, // body
          stateInit,
          sendMode: 3,
        });
      };

      return {
        send: (amount) => {
          return createPromise(amount).then((x) => x.send());
        },
        estimateFee: (amount) => {
          return createPromise(amount).then((x) => x.estimateFee());
        },
      };
    };

    return {
      deploy: () => {
        return transfer(null, true);
      },
    };
  }
}

module.exports = { TonPaymentContractWrapper };
