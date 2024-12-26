// These styles apply to every route in the application
import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={{ token: { fontFamily: "Inter" } }}>
      <Head>
        <title>Synapsis Post App</title>
      </Head>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
