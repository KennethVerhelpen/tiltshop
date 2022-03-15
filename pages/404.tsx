import { useState } from 'react';
import { Page } from '../components';
import { ThemeType } from '../lib/types';
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