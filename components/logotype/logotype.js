import logotype from "./logotype.module.scss";

class Logotype extends React.Component {
  render = () => {
    return (
      <div className={`${logotype.logo} layout-column`}>
        <img src="/images/logotype-brush.svg"/>
        <img src="/images/logotype-neon.svg"/>
      </div>
    );
  };
}

export { Logotype};