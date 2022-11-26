export function getLabel(addressToBeLabeled, activeAddress) {
  if (!addressToBeLabeled) return '';
  if (addressToBeLabeled == activeAddress) return 'you';
  else return (addressToBeLabeled.substring(0, 6) + "..." + addressToBeLabeled.slice(-4));
}