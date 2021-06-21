export type TypeType = {
	id: number,
	slug?: string,
	name?: string,
}

export type TopicType = {
	id?: number;
	slug?: string
	name?: string;
	typeId?: number,
  typeSlug?: string,
  typeName?: string,
	articlesCount?: number;
	plainDescription?: string;
	htmlDescription?: string;
}

export type ArticleType = {
  id?: number;
  title?: string;
  imgAlt?: string;
  slug?: string;
  typeId?: number;
  typeSlug?: string;
  typeName?: string;
  topicId?: number;
  topicSlug?: string;
  topicName?: string;
  category?: string;
  url?: string;
  trackingUrl?: string;
  rating?: number | string;
  price?: number | string;
  priceNumber?: number;
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