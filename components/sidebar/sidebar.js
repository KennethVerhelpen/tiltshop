import sidebar from "./sidebar.module.scss";
import CloseRounded from "@material-ui/icons/CloseRounded";

import Link from "next/link";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: Function,
      isOpen: Boolean,
      article: Object,
    }
  }

  render() {
    if (!this.props.isOpen) {
      return null;
    }

    // const dynamicStyles = {
    //   image: {
    //     borderColor: this.props.article.color
    //   }
    // }

    return (
      <>
        <div className={`${sidebar.container} layout-column layout-align-start-end`}>
          <article className={`sidebar overflow-scroll display-block width-100 ${sidebar.shape} ${this.props.isOpen ? "fade-in-right speed-3" : ""} shadow-4`}>
            <header className={`${sidebar.header} bg-secondary-900 layout-row layout-align-start-center p-16`}>
              <a onClick={this.props.onClick} className={`${sidebar.closeBtn} cursor-pointer text-secondary-100 bg-secondary-700 p-8`}>
                <CloseRounded style={{ fontSize: 16 }}/>
              </a>
            </header>
            <main className="overflow-scroll">
              <div className="layout-row p-32">
                <div className="layout-column layout-align-start-start p-16 flex">
                  <p className="serif text-secondary-100 mb-16">{this.props.article.motion}</p>
                  <p className="h2 text-secondary-100 b">{this.props.article.title}</p>
                  <p className="text-secondary-100 my-16">{this.props.article.description}</p>
                  <span className="text-secondary-100 rounded-xs border border-secondary-100 py-4 px-8">{this.props.article.category}</span>
                </div>
                <div className="layout-column layout-align-start-start p-16 flex">
                  <p className="h1 b text-secondary-100 my-64">{this.props.article.price}</p>
                  <Link href={this.props.article.url}>
                    <button className={`${sidebar.btn} btn btn-xl btn-flat btn-secondary btn-hoverable`}>Buy on Amazon</button>
                  </Link>
                </div>
              </div>
              <div className="layout-row">
                <img className={`${sidebar.defaultImage}`} src={this.props.article.imgSrc}></img>
                <div className="layout-row layout-wrap">
                  <img className={`${sidebar.defaultImage} flex-50`} src={this.props.article.imgSrc}></img>
                  <img className={`${sidebar.defaultImage} flex-50`} src={this.props.article.imgSrc}></img>
                  <img className={`${sidebar.defaultImage} flex-50`} src={this.props.article.imgSrc}></img>
                  <img className={`${sidebar.defaultImage} flex-50`} src={this.props.article.imgSrc}></img>
                </div>
              </div>
              <div className="mt-64">
                <table className={`${sidebar.table}`}>
                  <thead>
                    <tr>
                      <th colspan="2" className="h6 b text-left px-48 pb-32 text-secondary-100">Item details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(this.props.article.details).map((key, value) => {
                      return (
                        <tr>
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
        <div className={`${sidebar.backdrop} ${this.props.isOpen ? "fade-in speed-6" : ""}`}></div>
      </>
    )
  }
}

export default Sidebar;