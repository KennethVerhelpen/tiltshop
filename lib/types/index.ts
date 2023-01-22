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
	plainDescription?: string;
	htmlDescription?: string;
  _count?: {
    articles: number;
  }
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
  summary?: string;
}

export type FeaturedArticleType = {
  slug: string;
  title?: string;
  summary?: string;
  benefits?: string[];
  flaws?: string[];
}

export type PostType = {
  id?: number;
  slug: string;
  excerpt?: string;
  title: string;
  author: {
    id: string;
    name?: string;
    role?: string;
    description?: string;
  },
	content: string;
	ogImage: {
    url: string;
  };
  date: string;
  time?: number;
  featuredArticles: FeaturedArticleType[];
  articles?: ArticleType[];
  typeSlug?: string;
  topicSlug?: string;
  outro?: string;
}

export type SortingItemType = {
  value: string;
  label: string;
}

export type FormDataType = {
	state?: 'loading' | 'error' | 'success';
	message?: string;
}

export type ThemeType = 'dark' | 'light';

export type ImageType = 'cover' | 'avatar' | 'thumbnail';
