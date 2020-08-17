import modal from "./modal.module.scss";
import CloseRounded from "@material-ui/icons/CloseRounded";

class Modal extends React.Component {
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
    return (
      <>
        <div className={`${modal.container} overflow-x-scroll p-32`}>
          <article className={`modal ${modal.shape} shadow-4 bg-secondary-100 rounded-md`}>
            <header className="layout-row layout-align-end-center p-16">
              <a onClick={this.props.onClick} className={`${modal.closeBtn} cursor-pointer bg-secondary-500 p-8`}>
                <CloseRounded />
              </a>
            </header>
            <main className="p-32">
              {/* {this.props.article.id}
              {this.props.article.title}
              {this.props.article.imgSrc}
              {this.props.article.category} */}
            </main>
          </article>
        </div>
        <div className={`${modal.backdrop}`}></div>
      </>
    )
  }
}

export default Modal;