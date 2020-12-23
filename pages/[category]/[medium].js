import { Page, Article, Header } from '../../components/index';
import articlesSet from "../../lib/articles";
import mediaSet from "../../lib/media";
import styled from '@emotion/styled';
import Head from "next/head";

const Grid = styled.main`
  @media only screen and (max-width: 959px) and (max-width: 959px) {
    max-width: 44rem; 
  }
`

const ArticleShape = styled.div`
  height: 20rem;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);
`

class Medium extends React.Component {
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

    const articlesCount = articlesSet.filter(article => article.medium === this.props.id && article.category === this.props.categoryId).length;

    return (
      <>
        <Page
          media={mediaSet}
          menu={false}
          title={`Best 20+ products for ${this.props.name} lovers`}
          activePage={this.props.category}
          >
          <Header
            medium={this.props.name}
            title={this.props.name}
          />
          <Grid className="container-lg p-0 layout-column">
            {this.props.description &&
              <div className="blocktext serif lh-3 px-64 pb-64 text-center">
                {this.props.description.length > 1500 && !this.state.expanded ? 
                  <div dangerouslySetInnerHTML={this.createMarkup(`${this.props.description.slice(0,1500)}...`)}></p>
                  :
                  <div dangerouslySetInnerHTML={this.createMarkup(this.props.description)}></p>
                }
                { this.props.description.length > 1500 &&
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
              </div>
            }
            { articlesCount > 0
              ? <div className="layout-row layout-wrap layout-align-center-center">
                  { articlesSet.filter(article => article.medium === this.props.id && article.category === this.props.categoryId).map((article, index) => (
                    <div key={article.id} className="fade-in-bottom speed-5 cascade p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
                      <Article articleIndex={index} article={article} medium={this.props.name}/>
                    </div>
                  ))}
                </div>
              : <>
                  <div className="fade-in-bottom speed-9 layout-align-center-center layout-column text-center pt-64 px-32">
                    <p className="bold">No articles yet.</p>
                    <p className="small">We are currently working on collecting the best items for {this.props.name}.</p>
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
  const media = (await import("../../lib/media")).default;
  const paths = media.map((category => category.items.map((item => ({
    params: {
      category: category.slug.toString(),
      medium: item.slug.toString()
    }}
  ))))).flat();
  return {
    paths,
    fallback: false
  }
};

export async function getStaticProps({
  params: { medium, category }
}) {
  const media = (await import("../../lib/media.js")).default;
  const activeCategory = media.find(item => item.slug === category);
  const activeMedium = activeCategory.items.find(item => item.slug === medium);
  return {
    props: {
      name: activeMedium.name,
      id: activeMedium.id,
      slug: activeMedium.slug,
      description: activeMedium.description,
      categoryId: activeCategory.id
    }
  }
}

export default Medium;