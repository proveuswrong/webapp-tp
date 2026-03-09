import { ipfsGateway } from "/src/utils/addToIPFS";

const IPFS_FETCH_TIMEOUT_MS = 3000;

export default async function fetchIPFSJson(uri) {
  if (!uri) return {};

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), IPFS_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(ipfsGateway + uri, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("Network response was not OK");

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch IPFS JSON for ${uri}`, error);
    return {};
  } finally {
    clearTimeout(timeoutId);
  }
}
