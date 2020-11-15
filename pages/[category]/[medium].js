import { Page, Article } from '../../components/index';
import medium from "./medium.module.scss";
import articlesSet from "../../lib/articles";
import mediaSet from "../../lib/media";

class Medium extends React.Component {

  handleMediaSetChange = (index) => {
    this.setState({
      media: index ? mediaSet[index] : undefined
    })
  }

  render = () => {
    return (
      <Page media={mediaSet} onClick={this.handleMediaSetChange}>
        <header className={`${medium.header} text-center`}>
          <div className="container-md layout-column layout-align-center-center">
            <h1 className={`${medium.logo} serif strong`}>{this.props.name}</h1>
            <h2 className={`serif lh-2 mt-16 p ${medium.title}`}>
              <span>A currated list of items for</span><br />
              <span className="h4 bold">{this.props.name}'s fans.</span>
            </h2>
          </div>
        </header>
        <main className={`${medium.pageContent} container-lg p-0 layout-column`}>
          <div className="layout-row layout-wrap layout-align-center-center">
            {articlesSet.filter(article => article.medium === this.props.id).length > 0 && articlesSet.filter(article => article.medium === this.props.id).map((article) => {
              return (
                <div key={article.id} className={`p-16 ${medium.column}`}>
                  <Article article={article} />
                </div>
              )
            })}
          </div>
        </main>
        <img className={medium.pageBg} src={"/images/header-bg.png"} />
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
      slug: activeMedium.slug,
      imgSrc: activeMedium.imgSrc,
      imgAlt: activeMedium.imgAlt
    }
  }
}

export default Medium;