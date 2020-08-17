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

    const dynamicStyles = {
      image: {
        borderColor: this.props.article.color
      }
    }
    return (
      <>
        <div className={`${sidebar.container} overflow-x-scroll layout-column layout-align-start-end`}>
          <article className={`sidebar ${sidebar.shape} ${this.props.isOpen ? "fade-in-right speed-3" : ""} shadow-4`}>
            <header className="layout-row layout-align-end-center p-16">
              <a onClick={this.props.onClick} className={`${sidebar.closeBtn} cursor-pointer bg-secondary-500 p-8`}>
                <CloseRounded />
              </a>
            </header>
            <main>
              <div className="layout-row p-32">
                <div className="layout-column layout-align-start-start p-16 flex">
                  <p className="serif text-secondary-100 mb-16">{this.props.article.motion}</p>
                  <p className="h2 text-secondary-100 b">{this.props.article.title}</p>
                  <p className="text-secondary-100 my-16">{this.props.article.description}</p>
                  <span className="text-secondary-100 rounded-xs border border-secondary-100 py-4 px-8">{this.props.article.category}</span>
                  <p className="h1 b text-secondary-100 my-64">{this.props.article.price}</p>
                  <Link href={this.props.article.url}>
                    <button className={`${sidebar.btn} btn btn-xl btn-flat btn-secondary btn-hoverable`}>Buy on Amazon</button>
                  </Link>
                </div>
                <div className="p-16">
                  <img className={`${sidebar.defaultImage} rounded-md border`} style={dynamicStyles.image} src={this.props.article.imgSrc}></img>
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