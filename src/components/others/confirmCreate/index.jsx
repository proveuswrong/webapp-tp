import Tag from "/src/components/presentational/tag";
import * as styles from "./index.module.scss";
import {constants} from "ethers";
import CustomButton from "/src/components/presentational/button";


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
