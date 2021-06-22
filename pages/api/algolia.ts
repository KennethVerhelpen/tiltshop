import algoliasearch from 'algoliasearch';
import { ArticleType, TopicType, TypeType } from '../../lib/types/types';

export const algoliaSearchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
);

export const algoliaAdminClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

export async function generateArticlesRecords(types: TypeType[], topics: TopicType[], articles: ArticleType[]) {
  for(var i = 0; i < articles.length; i++) {
    if (articles[i].price && typeof articles[i].price === 'string') {
      const price = articles[i].price
      delete articles[i].price
      articles[i]["priceNumber"] = Number(price);
    }
    if (articles[i].rating && typeof articles[i].rating === 'string') {
      articles[i]["ratingNumber"] = Number(articles[i].rating);
    }
    if (articles[i].typeId) {
      const type = types.find(type => type.id === articles[i].typeId)
      delete articles[i].typeId
      articles[i]["typeName"] = type.name;
    }
    if (articles[i].topicId) {
      const topic = topics.find(topic => topic.id === articles[i].topicId)
      delete articles[i].topicId
      articles[i]["topicName"] = topic.name;
    }
  } return articles
}

export async function generateTopicsRecords(types, topics) {
  for(var i = 0; i < topics.length; i++) {
    if (topics[i].typeId) {
      const type = types.find(type => type.id === topics[i].typeId)
      delete topics[i].typeId
      topics[i]["typeName"] = type.name;
      topics[i]["typeSlug"] = type.slug;
    }
  } return topics
}

export const algoliaTopicsIndexName = "tiltshop-topics";
export const algoliaTopicsIndex = algoliaAdminClient.initIndex(algoliaTopicsIndexName);

export const algoliaArticlesIndexName = "tiltshop-articles";
export const algoliaArticlesIndex = algoliaAdminClient.initIndex(algoliaArticlesIndexName);

export const pushAlgoliaRecords = async (types: TypeType[], topics: TopicType[], articles: ArticleType[]) => {
  console.log("Topics", topics)
  console.log("Articles", articles)
  try {
    const clearTopics = await algoliaTopicsIndex.clearObjects();
  } catch (error) {
    console.log(error, "There was an error clearing the topics.");
  }
  try {
    const saveTopics = await algoliaTopicsIndex.saveObjects(await generateTopicsRecords(types, topics), { autoGenerateObjectIDIfNotExist: true });
  } catch (error) {
    console.log(error, "There was an error uploading the topics.");
  }
  try {
    const clearArticles =  await algoliaArticlesIndex.clearObjects();    
  } catch (error) {
    console.log(error, "There was an error clearing the articles.");
  }
  try {
    const saveArticles =  await algoliaArticlesIndex.saveObjects(await generateArticlesRecords(types, topics, articles), { autoGenerateObjectIDIfNotExist: true });;    
  } catch (error) {
    console.log(error, "There was an error uploading the articles.");
  }
}