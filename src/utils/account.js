import { isAddress, getAddress } from "viem";

export function getLabel(addressToBeLabeled, activeAddress) {
  addressToBeLabeled = addressToBeLabeled && getAddress(addressToBeLabeled);
  activeAddress = isAddress(activeAddress) && getAddress(activeAddress);

  if (!addressToBeLabeled) return "";
  if (addressToBeLabeled == activeAddress) return "you";
  else return getShortAddress(addressToBeLabeled);
}

export const getShortAddress = (address) => `${address.substring(0, 6)}...${address.slice(-4)}`;
