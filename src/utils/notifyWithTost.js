import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.module.scss";

export const MESSAGE_TYPE = Object.freeze({
    ipfs: "ipfs",
    transaction: "transaction",
})

export default async function notifyWithToast(promise, messageType, options = {}) {
    return toast.promise(promise, messageTemplates[messageType], options);
}

const messageTemplates = {
    ipfs: {
        pending: "Adding evidence to IPFS",
        success: {
            render({ data }) {
                console.log("ipfs data:", data)
                return (
                    <div >
                        <div>Evidence added to IPFS</div>
                        <a target="_blank" href={`https://ipfs.kleros.io/ipfs/${data[0].hash}`}>
                            view
                        </a>
                    </div >
                )
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
                return "Failed to execute transaction";
            },
        },
    },
    // add more message types here as needed
};
