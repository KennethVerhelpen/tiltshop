import clsx from 'clsx';
import Image from 'next/image';
import { createRef, useRef, useState, useEffect } from 'react';

import { ArticleType, TopicType, TypeType, PostType, ThemeType } from '../../lib/types';
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
  const [positions, setPositions] = useState({});

  useEffect(() => {
    setPositions(articles.map((article, index) => (
      articlesRefs.current[index].current?.getBoundingClientRect()?.top + window.scrollY
    )))
  }, [])

  const scrollYTo = (position: number) => {
    window.scrollTo(0, position)
  }
  
  return (
    <main className={'container-lg px-0 pt-128'}>
      <div className={'layout-column'}>
        <header className={'pb-64 px-32'}>
          <S.ImageWrapper className="relative rounded-xl shadow-2 width-100 overflow-hidden width-100 layout-column mb-64">
            <Image
              quality={'100'}
              objectFit={'cover'}
              layout={'fill'}
              objectPosition={'center'}
              loading={'lazy'}
              alt={post.title}
              src={post.coverImageUnsplashUrl}
            />
          </S.ImageWrapper>
          <div className={'layout-column layout-align-start-start mb-64'}>
            <h1 className={clsx(theme === 'dark' ? 'text-neutral-100' : 'text-primary-900', 'strong mb-8')} style={{ fontSize: 72 }}>{post.title}</h1>
            <div className={'layout-row'}>
              <span className={'mb-16 text-primary-500'}>{post.date}</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <span className={'mb-16 text-primary-500'}>{post.time}min. read</span>
            </div>
            <div className={'layout-row layout-wrap'}>
              {topics.map((topic) => (
                <span key={topic.slug} className={'mb-16 bg-primary-300 small py-4 px-8 mr-8 rounded-sm text-primary-700'}>{topic.name}</span>
              ))}
              {types.map((type) => (
                <span key={type.slug} className={'mb-16 bg-primary-300 small py-4 px-8 rounded-sm text-primary-700 text-capitalize'}>{type.name}</span>
              ))}
            </div>
          </div>
          <p className={'h6 text-primary-500 lh-2'} id={'#intro'}>{post.excerpt}</p>
        </header>
        <div className={'layout-row'}>
          <div className={'layout-column px-32'}>
            <S.PostContent className={'h6 text-primary-500 lh-2'} dangerouslySetInnerHTML={{__html: post.content}}/>
            {articles ? articles.map((article: ArticleType, index: number) => {
              const articleTopic = topics.find(topic => topic.id === article.topicId)
              const articleType = types.find(type => type.id === article.typeId)
              return (
                <div key={article.slug} ref={articlesRefs.current[index]} className={'layout-column border-bottom border-primary-800 py-64'}>
                  <div className={'layout-row'}>
                    <div className={'layout-column flex px-16 layout-align-start-start'}>
                      <h3 className={'bold mb-16 text-primary-300'}>{post.featuredArticles[index].title || article.title}</h3>
                      <span className={'mb-32 h6 text-primary-500 lh-2'}>{post.featuredArticles[index].summary}</span>
                      <span className={'bold h6 mb-16 text-primary-400'}>About this item:</span>
                      <ul className={'list-reset pl-16 mb-32'}>
                        {post.featuredArticles[index].benefits.map((benefit, index) =>(
                          <li className={clsx({'mb-16' : index + 1 === post.featuredArticles[index].benefits.length}, 'layout-row')} key={benefit}>
                            <span className={'mr-8 h6 lh-3'}>👍</span>
                            <p className={'h6 text-primary-500 lh-3'}>{benefit}</p>
                          </li>
                        ))}
                        {post.featuredArticles[index].flaws.map(flaw =>(
                          <li className={'layout-row'} key={flaw}>
                            <span className={'mr-8 h6 lh-3'}>❌</span>
                            <p className={'h6 text-primary-500 lh-3'}>{flaw}</p>
                          </li>
                        ))}
                      </ul>
                      <a className={'btn bg-neutral-100 btn-primary btn-md'}>See on <b>Amazon</b></a>
                    </div>
                    <div className={'layout-column'}>
                      <S.Article theme={'dark'} className={'sticky'} article={article} topic={articleTopic} type={articleType}/>
                    </div>
                  </div>
                </div>
            )}) : null}
            <p className={'h6 lh-2 text-primary-500 py-64'}>{post.outro}</p>
          </div>
          <div className={'layout-column px-32'} style={{minWidth: 240}}>
            <S.SideBlock className={'sticky layout-column'}>
              {post.author ? 
                <div className={'mb-16 layout-row layout-align-start-center'}>
                  {post.author.picture ? <S.AuthorImg className={'rounded border border-neutral-100 shadow-2 mr-8'} src={post.author.picture}/> : null}
                  {post.author.name || post.author.role ? 
                    <div className={'layout-column'}>
                      {post.author.name ? <span className={'h6 bold text-neutral-100'}>{post.author.name}</span> : null}
                      {post.author.role ? <span className={'p text-primary-500'}>{post.author.role}</span> : null}
                    </div>
                  : null }
                </div>
              : null}
              <div className={'shadow-2 rounded-md p-16 layout-column bg-neutral-100'}>
                <p className={'bold text-uppercase mb-16'}>In this article</p>
                <a className={'text-secondary-900 lh-3 cursor-pointer'} onClick={() => scrollYTo(0)}>Introduction</a>
                {articles ? articles.map((article: ArticleType, index: number) => (
                  <a className={'text-secondary-900 lh-3 cursor-pointer'} key={article.slug} onClick={() => scrollYTo(positions[index])}>{post.featuredArticles[index].title || article.title}</a>
                )) : null }
              </div>
            </S.SideBlock>
          </div>
          </div>
      </div>
    </main>
  )
}