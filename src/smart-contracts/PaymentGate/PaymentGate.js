export const PaymentGateContract = {
  address: process.env.REACT_APP_POLYGON_PAYMENT_CONTRACT,
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_priceFeedUSDT",
          type: "address",
        },
        {
          internalType: "address",
          name: "_priceFeedMATIC",
          type: "address",
        },
        {
          internalType: "address",
          name: "_usdtToken",
          type: "address",
        },
        {
          internalType: "address",
          name: "_brinToken",
          type: "address",
        },
        {
          internalType: "address",
          name: "_brinPriceContract",
          type: "address",
        },
        {
          internalType: "address",
          name: "_initialOwner",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "transactionId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "string",
          name: "paymentId",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountOfXToken",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "paymentAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "paymentTokenType",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "costInUSDT",
          type: "uint256",
        },
      ],
      name: "PaymentMade",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_contract",
          type: "address",
        },
        {
          internalType: "bool",
          name: "_authorized",
          type: "bool",
        },
      ],
      name: "authorizeContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "authorizedContracts",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "brinPriceContract",
      outputs: [
        {
          internalType: "contract IBrinPriceContract",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "brinToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBrinPrice",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_tokenSymbol",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_amountOfXToken",
          type: "uint256",
        },
      ],
      name: "getCostEstimation",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract AggregatorV3Interface",
          name: "_priceFeed",
          type: "address",
        },
      ],
      name: "getPrice",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_paymentId",
          type: "string",
        },
        {
          internalType: "string",
          name: "_tokenSymbol",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_amountOfXToken",
          type: "uint256",
        },
      ],
      name: "makePayment",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "maticToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "paymentCounter",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "payments",
      outputs: [
        {
          internalType: "uint256",
          name: "transactionId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "unitPrice",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "tokenPair",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "totalPayment",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amountOfXToken",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "blockTime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "paymentId",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_tokenSymbol",
          type: "string",
        },
        {
          internalType: "address",
          name: "_tokenAddress",
          type: "address",
        },
      ],
      name: "setTokenAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
      ],
      name: "setXTokenPriceInUSDT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      name: "tokenAddresses",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "usdtToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_tokenSymbol",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "xTokenPriceInUSDT",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
};
