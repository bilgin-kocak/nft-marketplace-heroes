import { ethers } from 'ethers';

// Convert the Big Number to a Avax string with 2 decimal places
const convertBNToEther2Decimal = (bigNumber) => {
  const value = ethers.utils.formatEther(bigNumber);
  if (value.split('.')[1].slice(0, 2) === '0') {
    return value.split('.')[0];
  } else {
    return value.split('.')[0] + '.' + value.split('.')[1].slice(0, 2);
  }
};

// convert the Avax string value to a string with 2 decimal places
const convertStringToEther = (value) => {
  if (value === null) {
    return '';
  } else if (value.split('.')[1].slice(0, 2) === '0') {
    return value.split('.')[0];
  } else {
    return value.split('.')[0] + '.' + value.split('.')[1].slice(0, 2);
  }
};

export { convertBNToEther2Decimal, convertStringToEther };
