import Link from 'next/link';

export default function Custom404() {
  return (
    <main style={{ background: 'black', color: 'white' }} className="layout-column layout-fill layout-align-center-center">
      <h1 className="strong serif" style={{ fontSize: '10rem' }}>404</h1>
      <h2 className="h5">Oops, something went wrong</h2>
      <Link href={'/'}>
        <a className="p mt-16 underline" aria-label="Back to home">Back to home</a>
      </Link>
    </main>
  );
};