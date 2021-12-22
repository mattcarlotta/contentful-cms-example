// import MoreStories from "../components/more-stories";
// import HeroPost from "../components/hero-post";
// import Intro from "../components/intro";
import Head from "next/head";
import isEmpty from "lodash.isempty";
import Article from "../components/article";
import Container from "../components/container";
import Layout from "../components/layout";
import { getAllArticlesForHome } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

export default function Index({ error, preview, allArticles }) {
  return (
    <Layout preview={preview}>
      <Head>
        <title>Articles Example with {CMS_NAME}</title>
      </Head>
      <Container>
        {!isEmpty(allArticles) &&
          Object.keys(allArticles).map((category) => (
            <Article
              key={category}
              articles={allArticles[category].items}
              category={category}
            />
          ))}
        {Boolean(error) && <p>{error}</p>}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  try {
    const { data } = (await getAllArticlesForHome(preview)) ?? {};

    return {
      props: { preview, allArticles: data },
    };
  } catch (error) {
    return {
      props: {
        error: error.message.toString(),
        preview,
        allArticles: { Awards: {}, Features: {}, General_News: {}, Op_Eds: {} },
      },
    };
  }
}
