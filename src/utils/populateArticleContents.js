import { ipfsGateway } from "/src/utils/addToIPFS";

export default async function populateArticleContents(articles) {
    const fetchPromises = articles.map(async (article) => {
        if (!article) return null;
        try {
            const response = await fetch(ipfsGateway + article?.articleID);
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }
            const { title, description, format } = await response.json();
            article.title = title;
            article.description = description;
            article.format = format;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    });

    await Promise.all(fetchPromises);
    return articles;
}