// The character limit on ENS names, nicknames and addresses before we truncate
export const TRUNCATED_NAME_CHAR_LIMIT = 11;

// The number of characters to slice from the beginning of an address for truncated format:
// `${TRUNCATED_ADDRESS_START_CHARS}...${TRUNCATED_ADDRESS_END_CHARS}`
export const TRUNCATED_ADDRESS_START_CHARS = 6;

// The number of characters to slice from the end of an address for truncated format:
// `${TRUNCATED_ADDRESS_START_CHARS}...${TRUNCATED_ADDRESS_END_CHARS}`
export const TRUNCATED_ADDRESS_END_CHARS = 4;

export const shortenDecimalString = (numberString) => {
  if (!numberString) {
    return "0";
  }
  const decimalPlaces = 2;
  // Split the number string into integer and decimal parts
  const parts = numberString.split(".");

  // If there's no decimal part or decimalPlaces is 0, return the integer part
  if (parts.length === 1 || decimalPlaces === 0) {
    return parts[0];
  }

  // Get the integer part and the truncated decimal part
  const integerPart = parts[0];
  const decimalPart = parts[1].substring(0, decimalPlaces);

  // If the decimal part is empty after truncation, return the integer part
  if (decimalPart.length === 0) {
    return integerPart;
  }

  // Return the shortened decimal number string
  return `${integerPart}.${decimalPart}`;
};

export const shortenWeb3Address = (address) => {
  if (address.length < TRUNCATED_NAME_CHAR_LIMIT) {
    return address;
  }

  return `${address.slice(0, TRUNCATED_ADDRESS_START_CHARS)}...${address.slice(
    -TRUNCATED_ADDRESS_END_CHARS
  )}`;
};

export const getTokenDecimals = (tokenSymbol) => {
  const tokenDecimalsBySymbol = {
    MATIC: 18,
    USDT: 6,
    BRIN: 18,
  };
  return tokenDecimalsBySymbol[tokenSymbol];
};
