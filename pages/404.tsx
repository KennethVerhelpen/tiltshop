import { Page } from '../components';
import { ErrorView } from '../views';

export const Custom404 = () => {
  return (
    <Page
      nav={false}
    > 
      <ErrorView />
    </Page>
  );
};

export default Custom404;