import { ipfsGateway } from "/src/utils/addToIPFS";

export default async function fetchIPFSJson(uri) {
  if (!uri) return {};

  try {
    const response = await fetch(ipfsGateway + uri);
    if (!response.ok) throw new Error("Network response was not OK");

    return await response.json();
  } catch (error) {
    console.error(error);
    return {};
  }
}
