import { Layout } from "@/components/layout/Layout";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Yassine Zaanouni</title>
        <meta name="description" content="Yassine Zaanouni's portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
