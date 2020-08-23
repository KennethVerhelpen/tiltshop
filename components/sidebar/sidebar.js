import sidebar from "./sidebar.module.scss";
import CloseRounded from "@material-ui/icons/CloseRounded";
import ArrowForwardRounded from "@material-ui/icons/ArrowForwardRounded";
import { CarouselProvider, Slider, Slide, Image, Dot } from 'pure-react-carousel';

import Link from "next/link";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: Function,
      isOpen: Boolean,
      article: Object
    }
  }

  render() {
    if (!this.props.isOpen) {
      return null;
    }

    const dynamicStyles = {
      title: {
        color: this.props.article.color
      }
    }

    return (
      <>
        <div className={`${sidebar.container} layout-column layout-align-start-end`}>
          <article className={`sidebar overflow-scroll width-100 ${sidebar.shape} ${this.props.isOpen ? "fade-in-right speed-3" : ""} shadow-4`}>
            <header className={`${sidebar.header} layout-row layout-align-start-center p-16`}>
              <a onClick={this.props.onClick} className={`${sidebar.closeBtn} cursor-pointer text-secondary-100 bg-secondary-700 p-8`}>
                <CloseRounded style={{ fontSize: 16 }}/>
              </a>
            </header>
            <img className={`${sidebar.cover} width-100 hide-xs`}src={this.props.article.coverSrc}></img>
            <main className="overflow-scroll pb-64 layout-column">
              <div className={`${sidebar.description} layout-row p-16 flex-order-xs-1`}>
                <div className="layout-column layout-align-start-start p-16 flex">
                  <p className="serif text-secondary-100 mb-16">{this.props.article.motion}</p>
                  <p className="h2 text-secondary-100 b">{this.props.article.title}</p>
                  <p className="text-secondary-100 my-16">{this.props.article.description}</p>
                  <p className="text-secondary-100 rounded-xs border border-secondary-100 py-4 px-8">
                    From <b>{this.props.article.price}</b>
                  </p>
                  <Link href={this.props.article.url}>
                    <button className={`${sidebar.btn} mt-16 btn btn-xl btn-flat btn-secondary btn-hoverable`}>
                      <span>Buy on Amazon</span>
                      <ArrowForwardRounded className="icon-right" style={{ fontSize: 16 }} />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="layout-column layout-gt-sm-row flex-order-xs-0">
                <CarouselProvider
                  naturalSlideWidth={100}
                  naturalSlideHeight={100}
                  totalSlides={this.props.article.gallery.length}
                  lockOnWindowScroll={true}
                  infinite={true}>
                  <Slider>
                    {this.props.article.gallery.map((image, key) => {
                      return (
                        <Slide index={key}>
                          <Image src={image.src} alt={image.alt}/>
                        </Slide>
                      );
                    })}
                  </Slider>
                  <div className="layout-row flex layout-wrap layout-align-center-center">
                    {this.props.article.gallery.map((image, key) => {
                      return (
                        <Dot slide={key} className={`${sidebar.thumbnail} flex-gt-xs-20 flex-none`} index={key}>
                          <img className="hide-xs" src={image.src} alt={image.alt} />
                        </Dot>
                      );
                    })}
                  </div>
                </CarouselProvider>
              </div>
              <div className="mt-32 flex-order-xs-2">
                <table className={`${sidebar.table}`}>
                  <thead>
                    <tr>
                      <th colSpan="2" className="h6 b text-left px-48 pb-32 text-secondary-100">Item details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pl-48 pl-8 py-8 text-secondary-100">Category</td>
                      <td className="pr-48 pl-8 py-8 text-secondary-100 text-right">{this.props.article.category}</td>
                    </tr>
                    {Object.keys(this.props.article.details).map((key) => {
                      return (
                        <tr key={key}>
                          <td className="pl-48 pl-8 py-8 text-secondary-100">{key}</td>
                          <td className="pr-48 pl-8 py-8 text-secondary-100 text-right">{this.props.article.details[key]}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </main>
          </article>
        </div>
        <div onClick={this.props.onClick} className={`cursor-pointer ${sidebar.backdrop} ${this.props.isOpen ? "fade-in speed-6" : ""}`}></div>
      </>
    )
  }
}

export default Sidebar;