import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang='en'>
        <Head />
        <link
          display='optional'
          href='https://fonts.googleapis.com/css?family=Montserrat:400,700'
          rel='stylesheet'
        />
        <link
          display='optional'
          href='https://fonts.googleapis.com/css?family=Roboto+Slab:300,400'
          rel='stylesheet'
        ></link>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
