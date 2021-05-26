import algoliasearch from 'algoliasearch';

export const algoliaSearchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
);

export const algoliaAdminClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY
);

export const algoliaTopicsIndexName = "tiltshop-topics";
export const algoliaTopicsIndex = algoliaAdminClient.initIndex(algoliaTopicsIndexName);
export const topics = require("../../lib/records/topics.json");

export const algoliaArticlesIndexName = "tiltshop-articles";
export const algoliaArticlesIndex = algoliaAdminClient.initIndex(algoliaArticlesIndexName);
export const articles = require("../../lib/records/articles.json");

export const pushAlgoliaRecords = async (req, res) => {
  try {
    const clearTopics = await algoliaTopicsIndex.clearObjects();
  } catch (error) {
    console.log(error, "There was an error clearing the topics.");
  }
  try {
    const saveTopics = await algoliaTopicsIndex.saveObjects(topics, { autoGenerateObjectIDIfNotExist: true });
  } catch (error) {
    console.log(error, "There was an error uploading the topics.");
  }
  try {
    const clearArticles =  await algoliaArticlesIndex.clearObjects();    
  } catch (error) {
    console.log(error, "There was an error clearing the articles.");
  }
  try {
    const clearArticles =  await algoliaArticlesIndex.saveObjects(articles, { autoGenerateObjectIDIfNotExist: true });;    
  } catch (error) {
    console.log(error, "There was an error uploading the articles.");
  }
}