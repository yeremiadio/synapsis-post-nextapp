// These styles apply to every route in the application
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={{ token: { fontFamily: "Inter" } }}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Head>
          <title>Synapsis Post App</title>
        </Head>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}
