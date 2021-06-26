import prisma from "../../lib/prisma";
import { useState } from "react";
import { Page, Article, Header } from '../../components/index';
import { TypeType, TopicType, ArticleType } from "../../lib/types/types";
import styled from '@emotion/styled';

type Props = {
  type: TypeType;
  topic: TopicType;
  articles: ArticleType[];
}

const Grid = styled.main`
  @media only screen and (max-width: 959px) and (max-width: 959px) {
    max-width: 44rem; 
  }
`

const ArticleShape = styled.div`
  height: 20rem;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);
`

const Description = styled.div`
  p {
    line-height: 1.5;
    font-size: 1.125rem;
  }
`

const Placeholder = styled.div`
  margin-top: -10rem;
`

const Topic = (props: Props) => {
	const { type, topic, articles } = { ...props };
  const [ isExpanded, setIsExpanded ] = useState<boolean>(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  const createMarkup = (html) => {
    return {__html: html};
  }

  return (
    <>
      <Page
        menu={false}
        title={`Best ${topic.articlesCount >= 20 ? '20+' : '10+' } products for ${topic.name} lovers`}
        history={`/${type.slug}`}
        coverImage={`/images/topics/${topic.slug}/cover.gif`}
        >
        <Header
          title={topic.name}
          medium={topic.name}
        />
        <Grid className="container-lg p-0 layout-column">
          {topic.htmlDescription && topic.htmlDescription.length &&
            <Description className="fade-in-bottom speed-5 blocktext serif px-xs-32 px-gt-xs-64 pb-64 text-center">
              {topic.htmlDescription.length > 1500 && !isExpanded ? 
                <div dangerouslySetInnerHTML={createMarkup(`${topic.htmlDescription.slice(0,1500)}...`)}></div>
                :
                <div dangerouslySetInnerHTML={createMarkup(topic.htmlDescription)}></div>
              }
              { topic.htmlDescription.length > 1500 &&
                <>
                  {' '}
                  <a onClick={() => toggleExpanded()} aria-label="Description expand" className="cursor-pointer underline">
                    { isExpanded
                      ? <span>Show less</span>
                      : <span>Read more</span>
                    }
                  </a>
                </>
              }
            </Description>
          }
          { articles && articles.length > 0
            ? <div className="layout-row layout-wrap layout-align-center-center mb-128">
                { articles.map((article: ArticleType, index: number) => (
                    <div key={article.id} className="fade-in-bottom speed-5 cascade p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
                      <Article index={index} article={article} topic={topic} type={type}/>
                    </div>
                ))}
              </div>
            : <>
                <div className="fade-in-bottom speed-9 layout-align-center-center layout-column text-center pt-128 px-32">
                  <p className="bold">No articles yet.</p>
                  <p className="small">We are currently working on collecting the best items for {topic.name}.</p>
                </div>
                <Placeholder className="layout-row layout-wrap layout-align-center-center hide-xs mb-128">
                  {Array.from(Array(3), (number: number, index: number) => (
                    <div key={index} className="fade-in-bottom speed-5 cascade p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
                      <ArticleShape className="rounded-xl flex"/>
                    </div>
                  ))}
                </Placeholder>
              </>
          }
        </Grid>
      </Page>
    </>
  );
};

export async function getStaticPaths() {
  const topics = await prisma.topic.findMany();
  const types = await prisma.type.findMany();
  await prisma.$disconnect();

  const paths = topics.map((topic => {
    const type = types.find(type => type.id === topic.typeId)
    return {
      params: {
        type: type.slug,
        topic: topic.slug
      }
    }
  }));

  return {
    paths,
    fallback: false
  }
};

export async function getStaticProps({
  params: {
    topic: topicSlug,
    type: typeSlug
  }}){

  const currentTopic = await prisma.topic.findUnique({
    where: {
      slug: topicSlug
    }
  });

  const currentType = await prisma.type.findUnique({
    where: {
      slug: typeSlug
    }
  });
   
  const currentArticles = await prisma.article.findMany({
    where: {
      topicId: currentTopic.id
    }
  });

  await prisma.$disconnect();

  return {
    props: {
      type: currentType,
      topic: currentTopic,
      articles: currentArticles,
    }
  }
}

export default Topic;