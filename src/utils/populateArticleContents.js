import fetchIPFSJson from "/src/utils/fetchIPFSJson";

export default async function populateArticleContents(articles) {
  const fetchPromises = articles.map(async (article) => {
    if (!article) return null;

    const { title, description, format } = await fetchIPFSJson(article?.articleID);
    article.title = title;
    article.description = description;
    article.format = format;
    return article;
  });

  const results = await Promise.all(fetchPromises);
  return results.filter(Boolean);
}
