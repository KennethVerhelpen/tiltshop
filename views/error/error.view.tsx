import Link from 'next/link';

import * as S from './error.view.styles';
			
export type ErrorViewProps = {
  error?: number;
}

const defaultProps = {
  error: 404,
}

export const ErrorView = (props: ErrorViewProps) => {
	const { error } = { ...defaultProps, ...props };
  
  return (
    <main className={'bg-secondary-900 layout-column layout-fill layout-align-center-center text-center p-32'}>
      <S.Title className={'strong serif text-secondary-100'}>{error}</S.Title>
      <h2 className={'h5 text-secondary-100'}>Oops, something went wrong</h2>
      <Link href={'/'}>
        <a className={'p mt-16 underline text-secondary-100'} aria-label={'Back to home'}>Back to home</a>
      </Link>
    </main>
  )
}