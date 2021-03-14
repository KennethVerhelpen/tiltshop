export type TypeType = {
	id?: string | number,
	slug?: string,
	name?: string,
}

export type TopicType = {
	id?: number;
	slug?: string
	name?: string;
	type?: string,
	articlesCount?: number;
	plainDescription?: string;
	htmlDescription?: string;
}

export type ArticleType = {
  id?: number;
  title?: string;
  imgAlt?: string;
  slug?: string;
  type?: number;
  topic?: number;
  category?: string;
  url?: string;
  trackingUrl?: string;
  rating?: number;
  price: {
    dollar?: number;
  };
  description?: string;
  details?: string;
  likes?: number;
}