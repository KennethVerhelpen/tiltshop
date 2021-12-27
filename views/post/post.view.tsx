import Image from 'next/image';

import { ArticleType, TopicType, TypeType, PostType } from '../../lib/types';
import { Article } from '../../components';
			
export type PostViewProps = {
	types?: TypeType[];
	topics?: TopicType[];
	post: PostType;
  articles: ArticleType[];
}

export const PostView = (props: PostViewProps) => {
	const { types, topics, articles, post } = { ...props };
  
  return (
    <main className={'container-lg'}>
      <div className={'layout-column'}>
        <header>
          <Image
            quality={'100'}
            width={'100%'}
            height={'300px'}
            objectFit={'cover'}
            objectPosition={'center'}
            priority={true}
            loading={'eager'}
            alt={post.title}
            src={post.coverImage}
            className={'rounded-lg shadow-2 overflow-hidden'}
          />
          <div className={'layout-column layout-align-start-start mb-64'}>
            <h1 className={'strong mb-8'} style={{ fontSize: 72 }}>{post.title}</h1>
            <div className={'layout-row'}>
              <span className={'mb-16'}>{post.date}</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <span className={'mb-16'}>{post.time}min. read</span>
            </div>
            <div className={'layout-row layout-wrap'}>
              {topics.map((topic) => (
                <span className={'mb-16 bg-primary-300 py-4 px-8 rounded-sm'}>{topic.name}</span>
              ))}
              {types.map((type) => (
                <span className={'mb-16 bg-primary-300 py-4 px-8 rounded-sm'}>{type.name}</span>
              ))}
            </div>
            
          </div>
        </header>
        <p className={'h6'}>{post.excerpt}</p>
        <div className={'layout-row'}>
          <div className={'layout-column'}>
            <div className={'h6'} dangerouslySetInnerHTML={{__html: post.content}}/>
            {articles ? articles.map((article: ArticleType, index: number) => {
              const articleTopic = topics.find(topic => topic.id === article.topicId)
              const articleType = types.find(type => type.id === article.typeId)
              return (
                <div className={'layout-column'}>
                  <div className={'layout-row py-64'}>
                    <div className={'layout-column flex px-16 layout-align-start-start'}>
                      <h3 className={'bold mb-16'}>{post.featuredArticles[index].title || article.title}</h3>
                      <span className={'mb-32 h6 lh-2'}>{post.featuredArticles[index].summary}</span>
                      <ul className={'list-reset mb-32 h6 lh-2'}>
                        {post.featuredArticles[index].benefits.map(benefit =>(
                          <li>👍 {benefit}</li>
                        ))}
                        {post.featuredArticles[index].flaws.map(flaw =>(
                          <li>❌ {flaw}</li>
                        ))}
                      </ul>
                      <button className={'btn btn-raised btn-primary btn-md'}>See on amazon</button>
                    </div>
                    <Article article={article} topic={articleTopic} type={articleType}/>
                  </div>
                </div>
            )}) : null}
            <p className={'h6'}>{post.outro}</p>
            </div>
            <div className={'layout-column'} style={{minWidth: 240}}>

              {post.author ? 
                <div className={'sticky'}>
                  {post.author.picture ? <img src={post.author.picture}/> : null}
                  {post.author.name || post.author.role ? 
                    <div>
                      {post.author.name ? <span>{post.author.name}</span> : null}
                      {post.author.role ? <span>{post.author.role}</span> : null}
                    </div>
                  : null }
                </div>
              : null}
              
              <span>Title</span>
              <span>Title</span>
              <span>Title</span>
              <span>Title</span>
            </div>
          </div>
      </div>
    </main>
  )
}