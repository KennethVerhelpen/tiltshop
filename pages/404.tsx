import { useContext } from 'react';

import { Page } from '../components';
import { ErrorView } from '../views';
import { ThemeContext } from './_app';

const Custom404 = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Page
      theme={theme}
      nav={false}
    > 
      <ErrorView theme={theme}/>
    </Page>
  );
};

export default Custom404;