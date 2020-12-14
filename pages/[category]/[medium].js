import { Page, Article } from '../../components/index';
import styles from "./medium.module.scss";
import Image from "next/image";
import articlesSet from "../../lib/articles";
import styled from '@emotion/styled';
import mediaSet from "../../lib/media";
class Medium extends React.Component {

  handleMediaSetChange = (index) => {
    this.setState({
      media: index ? mediaSet[index] : undefined
    })
  }

  render = () => {
    const Header = styled.header`
      padding: 12rem 0 6rem 0;

      h1 {
        font-size: 5rem;
        letter-spacing: -1.5px;
        text-shadow: 10px 10px 10px rgba(0,0,0,0.12);
      }

      @media only screen and (max-width: 599px) {
        .h1 {
          font-size: 3rem;
        }
      }
    `

    return (
      <Page media={mediaSet} onClick={this.handleMediaSetChange}>
        <Header className={`${styles.header} text-center`}>
          <div className="container-md layout-column layout-align-center-center">
            <h1 className="strong">{this.props.name}</h1>
            <h2 className="h5 lh-2 mt-16">
              A currated list of items for <b>{this.props.name}'s fans.</b>
            </h2>
          </div>
        </Header>
        <main className={`${styles.pageContent} container-lg p-0 layout-column`}>
          <div className="layout-row layout-wrap layout-align-center-center">
            {articlesSet.filter(article => article.medium === this.props.id).length > 0 && articlesSet.filter(article => article.medium === this.props.id).map((article, index) => (
              <div key={article.id} className={`p-16 ${styles.column}`}>
                <Article articleIndex={index} article={article} />
              </div>
            ))}
          </div>
        </main>
        <div className={styles.pageBg}>
          <Image
            objectFit="cover"
            quality="100"
            objectPosition="center"
            priority={true}
            loading="eager"
            layout="fill"
            src={`/images/medium/${this.props.slug}/cover.jpg`}
            alt="TiltShop header background"
          />
        </div>
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