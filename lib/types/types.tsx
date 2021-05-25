export type TypeType = {
	id?: string | number,
	slug?: string,
	name?: string,
}

export type TopicType = {
	id?: number;
	slug?: string
	name?: string;
	type?: number,
	articlesCount?: number;
	plainDescription?: string;
	htmlDescription?: string;
}

export type TopicRecordType = {
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

export type ArticleRecordType = {
  id?: number;
  title?: string;
  imgAlt?: string;
  slug?: string;
  type?: string;
  topic?: string;
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

export type PostType = {
  id: number;
  slug: string;
  title: string;
  intro: string;
  views?: number;
  likes?: number;
  type?: number;
  topic?: number;
  date?: string;
  time?: number;
}

export type SortingItemType = {
  value: string;
  label: string;
}