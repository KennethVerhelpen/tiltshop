import algoliasearch from 'algoliasearch';

export const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_KEY
);

export const algoliaTopicsIndexName = "tiltshop-topics";
export const algoliaTopicsIndex = algoliaClient.initIndex(algoliaTopicsIndexName);
export const topics = require("../../lib/records/topics.json");

export const algoliaArticlesIndexName = "tiltshop-articles";
export const algoliaArticlesIndex = algoliaClient.initIndex(algoliaArticlesIndexName);
export const articles = require("../../lib/records/articles.json");

export const pushAlgoliaRecords = () => {
  algoliaTopicsIndex.clearObjects();
	algoliaTopicsIndex.saveObjects(topics, { autoGenerateObjectIDIfNotExist: true });

  algoliaArticlesIndex.clearObjects();
  algoliaArticlesIndex.saveObjects(articles, { autoGenerateObjectIDIfNotExist: true });
}