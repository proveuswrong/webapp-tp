import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.module.scss";

export const MESSAGE_TYPE = Object.freeze({
  ipfs: "ipfs",
  transaction: "transaction",
});

export default async function notifyWithToast(promise, messageType, options = {}) {
  return toast.promise(promise, messageTemplates[messageType], options);
}

//TODO: refactor (more clean and reusable)
export function notifyProviderConnectionStatus() {
  return toast.warn(
    <>
      <div>Please install Metamask to connect to app</div>
      <a href="https://metamask.io/download/" target="_blank">
        Install
      </a>
    </>,
    { autoClose: false }
  );
}

const messageTemplates = {
  ipfs: {
    pending: "Adding evidence to IPFS",
    success: {
      render({ data }) {
        console.log("ipfs data:", data);
        return (
          <div>
            <div>Evidence added to IPFS</div>
            <a target="_blank" href={`https://ipfs.kleros.io/ipfs/${data[0].hash}`}>
              view
            </a>
          </div>
        );
      },
    },
    error: "Error while adding file to IPFS",
  },
  transaction: {
    pending: "Sending transaction",
    success: {
      render({ data }) {
        console.log({ data });
        return (
          <div>
            <div>Transaction mined successfully!</div>
            <a target="_blank" href={`https://goerli.etherscan.io/tx/${data.transactionHash}`}>
              View on Etherscan
            </a>
          </div>
        );
      },
    },
    error: {
      render({ data }) {
        console.log({ data });
        if (data.code === 4001) return "User denied transaction";
        if (data?.error?.code === -32603) return <TxRevertMessage errorMessage={data.error.message} />;
        return "Failed to execute transaction";
      },
    },
  },
  // add more message types here as needed
};

const TxRevertMessage = ({ errorMessage }) => {
  const [title, reason] = errorMessage.split(":");
  console.log({ title, reason });
  return (
    <>
      <div style={{ fontSize: "20px", textTransform: "capitalize" }}>{title}</div>
      <div style={{ fontSize: "16px" }}>{reason}</div>
    </>
  );
};
