import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
// import { ServerStyleSheets } from '@material-ui/core/styles';

export default class MyDocument extends Document {

  render() {
    return (
      <Html lang='pt'>
        <Head>
          {/* <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Raleway:wght@800&display=swap'
            rel='stylesheet'
          />

          <link
            rel='stylesheet'
            href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
          />
          <script src='https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'></script> */}
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>

          {/* <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_KEY}&libraries=drawing,places&callback=Function.prototype`}
          /> */}

          {/* <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          />
          <script
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9562798393573263'
            crossOrigin="anonymous"
          ></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
            }}
          /> */}
        </body>
      </Html>
    );
  }
}
