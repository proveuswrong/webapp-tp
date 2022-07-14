import {Buffer} from "buffer";

export default async function addToIPFS(endpoint, fileName, data) {
  const buffer = await Buffer.from(data)

  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        fileName,
        buffer
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(success => resolve(success.data))
      .catch(err => reject(err))
  })
}

export const ipfsGateway = 'https://ipfs.kleros.io'