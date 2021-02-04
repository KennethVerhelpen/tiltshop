import { Page, Article, Header } from '../../components/index';
import { getArticles, getTopics, getTypes } from "../../lib/api";
import { throttleApi } from "../../lib/utils";
import styled from '@emotion/styled';

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
class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
	}

  handleDescriptionExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  createMarkup = (html) => {
    return {__html: html};
  }

  render = () => {
    const { type, topic, articles } = this.props;
    return (
      <>
        <Page
          menu={false}
          title={`Best 20+ products for ${topic.name} lovers`}
          activePage={type.slug}
          history={`/${type.slug}`}
          >
          <Header
            title={topic.name}
            medium={topic.name}
          />
          <Grid className="container-lg p-0 layout-column">
            {topic.htmlDescription && topic.htmlDescription.length &&
              <Description className="fade-in-bottom speed-5 blocktext serif px-xs-32 px-gt-xs-64 pb-64 text-center">
                {topic.htmlDescription.length > 1500 && !this.state.expanded ? 
                  <div dangerouslySetInnerHTML={this.createMarkup(`${topic.htmlDescription.length.slice(0,1500)}...`)}></div>
                  :
                  <div dangerouslySetInnerHTML={this.createMarkup(topic.htmlDescription)}></div>
                }
                { topic.htmlDescription.length > 1500 &&
                  <>
                    {' '}
                    <a onClick={() => this.handleDescriptionExpand()} aria-label="Description expand" className="cursor-pointer underline">
                      { this.state.expanded
                        ? <span>Show less</span>
                        : <span>Read more</span>
                      }
                    </a>
                  </>
                }
              </Description>
            }
            { articles && articles.length > 0
              ? <div className="layout-row layout-wrap layout-align-center-center">
                  { articles.map((article, index) => (
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
                  <div className="layout-row layout-wrap layout-align-center-center hide-xs" style={{ marginTop: '-10rem' }}>
                    {Array.from(Array(3), (number, index) => (
                      <div key={index} className="fade-in-bottom speed-5 cascade p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
                        <ArticleShape className="rounded-xl flex"/>
                      </div>
                    ))}
                  </div>
                </>
            }
          </Grid>
        </Page>
      </>
    );
  };
}

export async function getStaticPaths() {
  const types = await throttleApi(0, getTypes());
  const topics = await throttleApi(0, getTopics());

  const paths = topics.map((topic => {
    const type = types.find(type => type.id === topic.type);
    return {
      params: {
        type: type.slug.toString(),
        topic: topic.slug.toString()
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

  const types = await throttleApi(0, getTypes());
  const topics = await throttleApi(0, getTopics());
  const articles = await throttleApi(0, getArticles());

  const currentType = types.find(type => type.slug === typeSlug);
  const currentTopic = topics.find(topic => topic.slug === topicSlug);
  const currentArticles = articles.filter(article => article.topic ===  currentTopic.id);

  return {
    props: {
      type: currentType,
      topic: currentTopic,
      articles: currentArticles,
    }
  }
}

export default Topic;