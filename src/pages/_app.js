import "@/styles/globals.css";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Cost Estimator</title>
        <meta name="description" content="*" />
      </Head>
      <div className={inter.variable}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
