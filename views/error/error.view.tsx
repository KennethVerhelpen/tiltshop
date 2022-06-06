import clsx from 'clsx';
import Link from 'next/link';

import { ThemeType } from '../../lib/types';
import * as S from './error.view.styles';
			
export type ErrorViewProps = {
  error?: number;
  theme?: ThemeType;
}

const defaultProps = {
  error: 404,
}

export const ErrorView = (props: ErrorViewProps) => {
	const { error, theme } = { ...defaultProps, ...props };
  
  return (
    <main className={clsx(
      theme === 'dark' ? 'bg-primary-900' : 'bg-neutral-100',
      'flex layout-column layout-fill layout-align-center-center text-center p-32'
    )}>
      <S.Title className={clsx(
        theme === 'dark' ? 'text-neutral-100' : 'text-primary-900',
        'strong serif')
      }>
        {error}
      </S.Title>
      <h2 className={'h6 text-primary-500 mt-8'}>Oops, something went wrong</h2>
      <Link href={'/'}>
        <a className={'p mt-16 underline text-primary-500'} aria-label={'Back to home'}>Back to home</a>
      </Link>
    </main>
  )
}