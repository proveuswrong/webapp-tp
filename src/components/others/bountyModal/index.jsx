import * as styles from "./index.module.scss";
import CustomButton from "/src/components/presentational/button";
import Modal from "../../presentational/modal";
import LoadingSpinner from "/src/components/presentational/loadingSpinner";
import { useContext, useState } from "react";
import { EthereumContext } from "/src/data/ethereumProvider";
import { constants, utils } from "ethers";
import notifyWithToast, { MESSAGE_TYPE } from "../../../utils/notifyWithTost";

export default function BountyModal({ articleStorageAddress, currentBounty, visible, onCancel }) {
  const ethereumContext = useContext(EthereumContext);
  const [amount, setAmount] = useState(0.001);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleControlChange(e) {
    setAmount(e.target.value);
  }

  async function handleIncreaseBounty() {
    setIsSubmitting(true);
    try {
      const unsignedTx = await ethereumContext.contractInstance.populateTransaction.increaseBounty(
        articleStorageAddress,
        {
          value: utils.parseEther(amount.toString()),
        }
      );
      await notifyWithToast(
        ethereumContext.ethersProvider
          .getSigner()
          .sendTransaction(unsignedTx)
          .then((tx) => tx.wait()),
        MESSAGE_TYPE.transaction
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal visible={visible} className={styles.bountyModal} onCancel={onCancel} footer={null}>
      <h1 className={styles.title}>Increase Bounty</h1>
      <p>
        Raising the bounty amount will have an impact on the rate at which your published article accumulates Trust
        score. A higher bounty amount will result in a greater level of trust being established by the community over
        time.
      </p>
      <div className={styles.inputContainer}>
        <label htmlFor="bounty">{`Increase amount by ( ${constants.EtherSymbol} ): `}</label>
        <input
          type="number"
          id="bounty"
          name="bounty"
          min="0.001"
          max="100.000"
          step="0.001"
          onChange={handleControlChange}
          value={amount}
        />
      </div>
      {currentBounty && (
        <p className={styles.currentBounty}>
          {`Current bounty: ${parseFloat(utils.formatEther(currentBounty)).toFixed(3)} ${constants.EtherSymbol}`}
        </p>
      )}
      <div className={styles.button}>
        <CustomButton onClick={handleIncreaseBounty}>{isSubmitting ? <LoadingSpinner /> : "Confirm"}</CustomButton>
      </div>
    </Modal>
  );
}
