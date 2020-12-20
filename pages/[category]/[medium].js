import { Page, Article, Header } from '../../components/index';
import articlesSet from "../../lib/articles";
import mediaSet from "../../lib/media";
import styled from '@emotion/styled';

const Grid = styled.main`
  @media only screen and (max-width: 959px) and (max-width: 959px) {
    max-width: 44rem; 
  }
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

  render = () => {
    return (
      <Page
        media={mediaSet}
        menu={false}
        activePage={this.props.category}
        >
        <Header
          medium={this.props.name}
          title={this.props.name}
        />
        <Grid className="container-lg p-0 layout-column">
          {this.props.description.length &&
            <p className="h6 serif lh-3 px-64 pb-64 text-center">
              {this.props.description.length > 300 && !this.state.expanded ? 
                <span>{`${this.props.description.slice(0,300)}...`}</span>
                :
                <span>{this.props.description}</span>
              }
              {' '}
              <a onClick={() => this.handleDescriptionExpand()} aria-label="Description expand" className="cursor-pointer underline">
                { this.state.expanded
                  ? <span>Show less</span>
                  : <span>Read more</span>
                }
              </a>
            </p>
          }
          <div className="layout-row layout-wrap layout-align-center-center">
            {articlesSet.filter(article => article.medium === this.props.id && article.category === this.props.categoryId).length > 0 && articlesSet.filter(article => article.medium === this.props.id && article.category === this.props.categoryId).map((article, index) => (
              <div key={article.id} className="fade-in-bottom speed-5 cascade p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
                <Article articleIndex={index} article={article} />
              </div>
            ))}
          </div>
        </Grid>
      </Page>
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
      description: activeMedium.description | null,
      categoryId: activeCategory.id
    }
  }
}

export default Medium;