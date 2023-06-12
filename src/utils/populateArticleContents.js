import { ipfsGateway } from "/src/utils/addToIPFS";

export default async function populateArticleContents(articles) {
    const fetchPromises = articles.map(async (article) => {
        if (!article) return null;
        try {
            const response = await fetch(ipfsGateway + article?.articleID);
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }
            const { title, description } = await response.json();
            article.title = title;
            article.description = description;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    });

    await Promise.all(fetchPromises);
    return articles;
}