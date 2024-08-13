import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Cost Estimator</title>
        <meta name="description" content="*" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
