import algoliasearch from 'algoliasearch';

export const algoliaSearchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
);

export const algoliaAdminClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

export const algoliaTopicsIndexName = 'tiltshop-topics';
export const algoliaTopicsIndex = algoliaAdminClient.initIndex(algoliaTopicsIndexName);

export const algoliaArticlesIndexName = 'tiltshop-articles';
export const algoliaArticlesIndex = algoliaAdminClient.initIndex(algoliaArticlesIndexName);

export const pushAlgoliaRecords = async (articles, types, topics) => {
  if (topics) {
    try {
      const clearTopics = await algoliaTopicsIndex.clearObjects();
    } catch (error) {
      console.log(error, 'There was an error clearing the topics.');
    }
    try {
      const saveTopics = await algoliaTopicsIndex.saveObjects(await topics, { autoGenerateObjectIDIfNotExist: true });
    } catch (error) {
      console.log(error, 'There was an error uploading the topics.');
    }
  }
  if (articles) {
    try {
      const clearArticles =  await algoliaArticlesIndex.clearObjects();    
    } catch (error) {
      console.log(error, 'There was an error clearing the articles.');
    }
    try {
      const saveArticles =  await algoliaArticlesIndex.saveObjects(articles, { autoGenerateObjectIDIfNotExist: true });;    
    } catch (error) {
      console.log(error, 'There was an error uploading the articles.');
    }
  }
}