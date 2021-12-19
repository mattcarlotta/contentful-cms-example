// import MoreStories from "../components/more-stories";
// import HeroPost from "../components/hero-post";
// import Intro from "../components/intro";
import Head from "next/head";
import groupBy from "lodash.groupby";
import isEmpty from "lodash.isempty";
import { format } from "date-fns";
import Container from "../components/container";
import Layout from "../components/layout";
import Image from "../components/image";
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
            <section key={category}>
              <h1 className="text-5xl font-bold text-center">{category}</h1>
              <div className="flex flex-row">
                {allArticles[category].map(
                  ({
                    sys: { id },
                    articleCategory,
                    date,
                    linkSrc,
                    linkLabel,
                    imgSrc,
                    imgAlt,
                    title,
                  }) => (
                    <article className="flex w-1/3 m-8" key={id}>
                      <a
                        href={linkSrc}
                        aria-label={linkLabel}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative">
                          <Image
                            className="object-fill object-center"
                            src={imgSrc.url}
                            height={imgSrc.height}
                            width={imgSrc.width}
                            alt={imgAlt}
                          />
                          <div className="text-black absolute bottom-0 left-0 bg-overlay px-2 w-full text-[28px]">
                            {articleCategory}
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold ease-in-out duration-300 hover:text-purple">
                          {title}
                        </h2>
                        <p>{format(new Date(date), "MMM dd, yyyy")}</p>
                      </a>
                    </article>
                  )
                )}
              </div>
            </section>
          ))}
        {Boolean(error) && <p>{error}</p>}
      </Container>

      {/* <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container> */}
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  try {
    const allArticles = (await getAllArticlesForHome(preview)) ?? {};

    return {
      props: { preview, allArticles: groupBy(allArticles, "articleCategory") },
    };
  } catch (error) {
    return {
      props: { error: error.message.toString(), preview, allArticles: {} },
    };
  }
}
