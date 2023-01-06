import {ethers} from "ethers";

export function getLabel(addressToBeLabeled, activeAddress) {
  addressToBeLabeled = addressToBeLabeled && ethers.utils.getAddress(addressToBeLabeled);
  activeAddress = activeAddress && ethers.utils.getAddress(activeAddress);

  if (!addressToBeLabeled) return '';
  if (addressToBeLabeled == activeAddress) return 'you';
  else return (addressToBeLabeled.substring(0, 6) + "..." + addressToBeLabeled.slice(-4));
}