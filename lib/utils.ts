import { ArticleType, TopicType, TypeType } from "./types";

export const throttleApi = (time, request) => {
  return (
    new Promise(function(resolve, reject){
        setTimeout(() => {
          resolve(request);
        }, time)
    })
  );
};

export const getAwsImageUrl = (params: string) => {
  if (params.length > 0) {
    const url = `https://tiltshop-data.s3.us-east-2.amazonaws.com${params}`;
    return url;
  } else {
    throw new Error('Missing params in the image url.');
  }
};

export const getReadingTime = (texts: string[]) => {
  const wordsPerMinute = 200;
  let time = null;
  if (texts.length > 0) {
    let totalCount: number = 0;
    for(var i = 0; i < texts.length; i++) { 
      totalCount += texts[i].split(" ").length;
    } return time = Math.ceil(totalCount / wordsPerMinute);
  } return time
}

export const getFormatedDate = (date: string) => {
  let shortDate: string = null;
  if (date.length > 0) {
    shortDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(new Date(date));
  } return shortDate;
}

export  const createMarkup = (html) => {
  return {__html: html};
}

// Adding and populating missing data to the topics array.
export const populateTopicsData = (topics: TopicType[], types: TypeType[]) => {
  if (topics && types) {
    topics.forEach((topic) => {
      topic['typeName'] = types.find(type => type.id === topic.typeId).name;
      topic['typeSlug'] = types.find(type => type.id === topic.typeId).slug;
    }); return topics;
  } else {
    throw new Error('Missing topics or types data.');
  }
}

// Adding and populating missing data to the articles array.
export const populateArticlesData = (articles: ArticleType[], topics: TopicType[], types: TypeType[]) => {
  if (articles && topics && types) {
    articles.forEach((article) => {
      // Pushing and converting price data into number
      if (article.price && typeof article.price === 'string') {
        const price = article.price
        article['priceNumber'] = Number(price);
      }
      // Pushing and converting rating data into number
      if (article.rating && typeof article.rating === 'string') {
        article['ratingNumber'] = Number(article.rating);
      }
      // Pushing new type data
      if (article.typeId) {
        const type = types.find(type => type.id === article.typeId)
        article['typeName'] = type.name;
        article['typeSlug'] = type.slug;
      }
      // Pushing new topic data
      if (article.topicId) {
        const topic = topics.find(topic => topic.id === article.topicId)
        article['topicName'] = topic.name;
        article['topicSlug'] = topic.slug;
      }
    }); return articles;
  } else {
    throw new Error('Missing articles, topics or types data.');
  }
}
