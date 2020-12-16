import { Page, Article, Header } from '../../components/index';
import articlesSet from "../../lib/articles";
import mediaSet from "../../lib/media";
class Medium extends React.Component {

  render = () => {
    return (
      <Page
        media={mediaSet}
        activePage={this.props.category}
        >
        <Header
          medium={this.props.name}
          title={this.props.name}
        />
        <main className="container-lg p-0 layout-column">
          <div className="layout-row layout-wrap layout-align-center-center">
            {articlesSet.filter(article => article.medium === this.props.id).length > 0 && articlesSet.filter(article => article.medium === this.props.id).map((article, index) => (
              <div key={article.id} className="p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
                <Article className="flex" articleIndex={index} article={article} />
              </div>
            ))}
          </div>
        </main>
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
  params: { medium }
}) {
  const media = (await import("../../lib/media.js")).default;
  const items = media.map((categories => categories)).map(category => category.items && category.items).flat();
  const activeMedium = items.find(item => item.slug === medium);
  return {
    props: {
      name: activeMedium.name,
      id: activeMedium.id,
      slug: activeMedium.slug
    }
  }
}

export default Medium;