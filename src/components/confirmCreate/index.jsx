import Tag from "/src/components/ui/tag";
import * as styles from "./index.module.scss";
import {constants} from "ethers";
import CustomButton from "/src/components/ui/button";


export default function ConfirmCreate({title, description, tags, bounty, categoryNo, handleCreate, handleGoBack}) {


  return (
    <>
      <div className={styles.bountyAmount}>
        Bounty:{" "}{bounty}{' '}{constants.EtherSymbol}
      </div>
      <h1>{title}</h1>
      <p className={styles.description}>
        {description}
      </p>
      <div className={styles.containerTag}>
        {tags.split(' ').map((tag, index) => <Tag key={'tag' + index}>{tag}</Tag>)}
      </div>

      <div className={styles.info}>
        This article will be published in the curation pool id {categoryNo}. Before publishing this article make sure you read the rules of
        this curation pool. In case of a dispute, respective arbitrator will be authorized to rule and you can defend your article by
        presenting
        your
        arguments and evidence. If you lose a round in the dispute, you can appeal it by paying arbitration fees. If the final verdict is
        that this article is not eligible for this curation pool, the challenger will win your bounty as a reward.
      </div>


      <div className={styles.buttons}>
        <CustomButton type="button" onClick={handleCreate}>
          Publish
        </CustomButton>
        <CustomButton type="button" modifiers='secondary' onClick={handleGoBack}>
          Go Back And Edit
        </CustomButton>
      </div>

    </>
  );
}
