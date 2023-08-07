import '../src/styles/globals.scss'
import Custom404 from './404'; // Import komponen custom 404
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NextSeo } from "next-seo";
import Footer from '../src/components/Footer';
import Script from 'next/script';
import * as gtag from '../google';
import { Component, useEffect, useState } from 'react';
import { CREATE_SEO_CONFIG } from '../src/utils/utils';
import { ThemeProvider } from 'next-themes'
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import "@uiw/react-textarea-code-editor/dist.css";
import 'react-medium-image-zoom/dist/styles.css';


function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const env = process.env.NODE_ENV;
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  let SEO_CONFIG = CREATE_SEO_CONFIG({});

  if (!mounted && env === 'development') return null
  return (
    <>
      <NextSeo {...SEO_CONFIG} />
      <Head>
        <link rel="icon" href="/mosque.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="google" content="notranslate" />
      </Head>

      {/* {
        env !== 'development' ?
          <>
            <Script async
              strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${gtag.GA_ADSENSE_ID}`} crossOrigin="anonymous"></Script> */}
            {/* Google tag (gtag.js) */}
            {/* <Script async
              strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}></Script> */}
            {/* <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gtag.GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>

          : null
      } */}
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  )
}

MyApp.getInitialProps = async ( context: { Component: any; ctx: any; } ) => {
  const {Component, ctx} = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const statusCode = ctx.res ? ctx.res.statusCode : 404;

  return { pageProps, statusCode };
};

export default MyApp
