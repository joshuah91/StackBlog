import Head from "next/head";
import react from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/post.module.scss";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], weight: "400" });

const Post = () => {
  return (
    <>
      <Head>
        <title>Post</title>
        <meta name="description" content="Stackbuld blog platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <NavHeader />
        <div className={styles.post}></div>
        <Footer />
      </main>
    </>
  );
};

export default Post;
