import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={'en'}>
        <Head>
          {/* eslint-disable-next-line @next/next/google-font-display */}
          <link href={'https://fonts.googleapis.com/css2?family=Damion&display=block'} rel={'stylesheet'}/>
          <link href={'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone&display=block'} rel={'stylesheet'} />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.G_TAG}`} />
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.G_TAG}');`
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument