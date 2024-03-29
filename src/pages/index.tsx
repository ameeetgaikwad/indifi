import Image from "next/image";
import { Inter } from "next/font/google";

import Landing from "@/views/Landing/Landing";
import Layout from "@/views/Layout/Layout";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Indifi</title>
      </Head>
      <Layout>
        <Landing />
      </Layout>
    </>
  );
}
