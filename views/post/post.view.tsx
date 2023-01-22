import clsx from 'clsx';
import Image from 'next/image';
import { createRef, useRef, useState, useEffect } from 'react';

import { ArticleType, TopicType, TypeType, PostType, ThemeType, FeaturedArticleType } from '../../lib/types';
import { coverPlaceholder, avatarPlaceholder } from '../../lib/constants';
import { getAwsImageUrl } from '../../lib/utils';
import * as S from './post.styles';
			
export type PostViewProps = {
	types?: TypeType[];
	topics?: TopicType[];
	post: PostType;
  articles: ArticleType[];
  theme: ThemeType;
}

export const PostView = (props: PostViewProps) => {
	const { types, topics, articles, post, theme } = { ...props };
  const articlesRefs = useRef<unknown>([...new Array(articles.length)].map(() => createRef<HTMLDivElement>()));
  const coverImageUrl = getAwsImageUrl(`/images/blog/${post.slug}/cover.jpg`);
  const avatarImageUrl = getAwsImageUrl(`/images/authors/${post.author.id}/avatar.jpg`);
  const coverLoadingImageUrl = getAwsImageUrl(`/images/blog/${post.slug}/cover-loading.jpg`);

  const [positions, setPositions] = useState({});
  const [coverImage, setCoverImage] = useState<string | undefined>(coverImageUrl);
  const [avatarImage, setAvatarImage] = useState<string | undefined>(avatarImageUrl);

  useEffect(() => {
    setPositions(articles.map((article, index) => (
      articlesRefs.current[index].current?.getBoundingClientRect()?.top + window.scrollY
    )))
  }, [])

  const scrollYTo = (position: number) => {
    window.scrollTo(0, position)
  }
  
  return (
    <main className={'container-lg px-0 pt-64 pt-xs-0'}>
      <div className={'layout-column'}>
        <header className={'pb-64 px-32 px-xs-0'}>
          <S.CoverImageWrapper className={'relative overflow-hidden width-100 layout-column mb-64'}>
            <Image
              quality={'100'}
              objectFit={'cover'}
              layout={'fill'}
              objectPosition={'center'}
              loading={'lazy'}
              alt={post.title}
              placeholder={'blur'}
              blurDataURL={coverLoadingImageUrl}
              src={coverImage || coverPlaceholder}
              onError={() => setCoverImage(coverPlaceholder)}
            />
          </S.CoverImageWrapper>
          <div className={'layout-column layout-align-start-start mb-64 px-xs-16'}>
            <S.Title className={clsx(theme === 'dark' ? 'text-primary-100' : 'text-primary-900', 'strong mb-32')}>{post.title}</S.Title>
            <span className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500' , 'layout-row mb-16')}>
              <span>{post.date}</span>
              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <span>{post.time}min. read</span>
            </span>
            <div className={'layout-row layout-wrap'}>
              {topics.map((topic) => (
                <span key={topic.slug} className={'mb-16 bg-primary-300 small py-4 px-8 mr-8 rounded-sm text-primary-700'}>{topic.name}</span>
              ))}
              {types.map((type) => (
                <span key={type.slug} className={'mb-16 bg-primary-300 small py-4 px-8 rounded-sm text-primary-700 text-capitalize'}>{type.name}</span>
              ))}
            </div>
          </div>
          <p className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500', 'h6 lh-2 px-xs-16')} id={'#intro'}>{post.excerpt}</p>
        </header>
        <div className={'layout-row layout-wrap'}>
          <div className={'layout-column px-16 px-xs-16 flex'}>
            <S.PostContent className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500', 'h6  lh-2')} dangerouslySetInnerHTML={{__html: post.content}}/>
            {post.featuredArticles ? post.featuredArticles.map((featuredArticle: FeaturedArticleType, index: number) => {
              const article = articles.find(article => article.slug === featuredArticle.slug)
              const articleTopic = topics.find(topic => topic.id === article.topicId)
              const articleType = types.find(type => type.id === article.typeId)
              return (
                <div
                  key={article.slug}
                  ref={articlesRefs.current[index]}
                  className={clsx(
                    theme === 'dark' ? 'border-primary-700' : 'border-primary-300',
                    index === 0 ? 'pb-64' : 'py-64',
                    'layout-column border-bottom'
                  )}
                >
                  <div className={'layout-row layout-xs-column'}>
                    <div className={'layout-column flex px-16 layout-align-start-start flex-order-0 flex-order-xs-1'}>
                      <h2 className={clsx(theme === 'dark' ? 'text-primary-100' : 'text-primary-900', 'bold mb-16')}>{post.featuredArticles[index].title || article.title}</h2>
                      <span className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500', 'mb-32 h6 lh-2')}>{post.featuredArticles[index].summary}</span>
                      <span className={clsx(theme === 'dark' ? 'text-primary-300' : 'text-primary-700', 'bold h6 mb-16')}>About this item:</span>
                      <ul className={'list-reset pl-16 mb-32'}>
                        {post.featuredArticles[index].benefits.map((benefit, index) =>(
                          <li className={clsx({'mb-16' : index + 1 === post.featuredArticles[index].benefits.length}, 'layout-row')} key={benefit}>
                            <span className={'mr-8 h6 lh-3'}>👍</span>
                            <p className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500', 'h6 lh-3')}>{benefit}</p>
                          </li>
                        ))}
                        {post.featuredArticles[index]?.flaws?.map(flaw =>(
                          <li className={'layout-row'} key={flaw}>
                            <span className={'mr-8 h6 lh-3'}>❌</span>
                            <p className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500', 'h6 lh-3')}>{flaw}</p>
                          </li>
                        ))}
                      </ul>
                      <a href={article.trackingUrl} rel={'sponsored'} className={clsx(theme === 'dark' ? 'bg-primary-100 text-primay-900' :'bg-primary-900 text-primary-100','btn  btn-primary btn-md')}>See on <b>Amazon</b></a>
                    </div>
                    <div className={'layout-column flex-order-1 flex-order-xs-0 mb-xs-64'}>
                      <S.Article theme={theme} className={'sticky'} article={article} topic={articleTopic} type={articleType}/>
                    </div>
                  </div>
                </div>
            )}) : null}
            <p className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500', 'h6 lh-2 py-64')}>{post.outro}</p>
            <div>
              <div className="layout-row">
                <S.AvatarImageWrapper className={'overflow-hidden rounded mr-8'}>
                  <Image
                    width={40}
                    height={40}
                    quality={'100'}
                    objectFit={'cover'}
                    objectPosition={'center'}
                    alt={post.author.name}
                    src={avatarImage || avatarPlaceholder}
                    onError={() => {setAvatarImage(avatarPlaceholder)}}
                  />
                </S.AvatarImageWrapper>
                <div className={"layout-colum"}>
                  <span className="small medium text-primary-700">Name Lastname</span>
                  <div className="layout-row mt-8">
                    {new Array(5).fill('').map((number, index: number) => (
                      <S.StarRating key={index} style={{ fontSize: 14 }}/>
                    ))}
                  </div>
                </div>
              </div>
              <p className="small text-primary-500 mt-16">This is a fantastic collection of Harry Potter-inspired products. The Tom Marvolo Riddle Diary Note book is perfect for noting down ideas and reminders, and the Chocolate Frog Prop Replica looks just like the real thing. But the Marauders Map Replica really stands out. It’s an amazing piece of work that any fan of the series would be proud to own. Highly recommended!</p>
            </div>
          </div>
          <div className={'layout-column px-16 flex-none hide show-gt-sm'}>
            <S.SideBlock className={'sticky layout-column'}>
              {post.author ? 
                <div className={'layout-column'}>
                  <div className={'layout-row layout-align-start-center'}>
                    {avatarImage ?
                      <S.AvatarImageWrapper className={'overflow-hidden rounded mr-8'}>
                        <Image
                          width={40}
                          height={40}
                          quality={'100'}
                          objectFit={'cover'}
                          objectPosition={'center'}
                          alt={post.author.name}
                          src={avatarImage || avatarPlaceholder}
                          onError={() => {setAvatarImage(avatarPlaceholder)}}
                        />
                      </S.AvatarImageWrapper>
                      : null
                    }
                    {post.author.name || post.author.role ? 
                      <div className={'layout-column'}>
                        {post.author.name ? <span className={clsx(theme === 'dark' ? 'text-primary-100' : 'text-primary-900', 'p bold')}>{post.author.name}</span> : null}
                        {post.author.role ? <span className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500', 'small lh-1')}>{post.author.role}</span> : null}
                      </div>
                    : null }
                  </div>
                  {post.author.role
                    ? <p className={clsx(
                      theme === 'dark' ? 'text-primary-400' : 'text-primary-500',
                      'small lh-2 width-100 mt-16')}
                    >
                      {post.author.description}
                    </p>
                    : null
                  }
               </div>
              : null}
              <div className={'border border-primary-300 bg-neutral-100 shadow-2 rounded-lg p-16 layout-column bg-neutral-100 mt-16'}>
                <p className={'medium text-primary-900 medium py-8'}>In this article:</p>
                <S.IndexButton className={'btn-reset text-left py-8 cursor-pointer transition'} onClick={() => scrollYTo(0)}>Introduction</S.IndexButton>
                {articles ? articles.map((article: ArticleType, index: number) => (
                  <S.IndexButton className={'btn-reset text-left py-8 cursor-pointer transition'} key={article.slug} onClick={() => scrollYTo(positions[index])}>{post.featuredArticles[index].title || article.title}</S.IndexButton>
                )) : null }
              </div>
            </S.SideBlock>
          </div>
        </div>
      </div>
    </main>
  )
}