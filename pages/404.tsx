import Link from "next/link";
import styled from "@emotion/styled";


export default function Custom404() {

  const Title = styled.h1`
    font-size: 10rem;
    @media only screen and (max-width: 599px) {
      font-size: 5rem; 
    }
  `

  return (
    <main className="bg-secondary-900 layout-column layout-fill layout-align-center-center text-center p-32">
      <Title className="strong serif text-secondary-100">404</Title>
      <h2 className="h5 text-secondary-100">Oops, something went wrong</h2>
      <Link href={'/'}>
        <a className="p mt-16 underline text-secondary-100" aria-label="Back to home">Back to home</a>
      </Link>
    </main>
  );
};