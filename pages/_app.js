import { Layout } from "@/components/layout/Layout";
import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Layout>
        <Head>
          <title>Smart Content</title>
          <meta name="description" content="Smart Content's portfolio" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
