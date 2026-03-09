import { redirect, useLoaderData, useParams } from "react-router-dom";
import * as styles from "./index.module.scss";

import ListArticles from "/src/components/others/listArticles";
import { getArticlesByAuthor, getDefaultNetwork, networkMap } from "/src/data/ethereumProvider";
import populateArticleContents from "../../utils/populateArticleContents";

export async function loader({ params }) {
  if (!networkMap[params.chain]) return redirect(`/${getDefaultNetwork()}/account/${params.id}`);
  const articles = await getArticlesByAuthor(params.chain, params.id);
  return await populateArticleContents(articles);
}

export default function Account() {
  const { id } = useParams();
  const data = useLoaderData();

  return (
    <div className={styles.account}>
      <div className={styles.author}>
        Author: <span>{id}</span>
      </div>
      <div className={styles.totalPublished}>
        Total published: <span>{data?.length ?? 0}</span>
      </div>
      <div className={styles.articles}>
        <h3>My Articles</h3>
        <hr />
        <ListArticles articles={data} />
      </div>
    </div>
  );
}
