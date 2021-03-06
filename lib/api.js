import axios from "axios";
import get from "lodash.get";
import { getEnvironment } from "./client";

export const API = axios.create({
  baseURL: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
});

API.interceptors.response.use(
  ({ data }) => get(data, "data.categoryCollection.items", data),
  (error) => Promise.reject(get(error, "response.data.errors[0]", error))
);

const ARTICLE_GRAPHQL_FIELDS = `
sys {
  id
}
articleCategory
title
date
linkSrc
linkLabel
imgSrc {
  url
  contentType
  height
  width
}
imgAlt
`;

export async function createPost(fields) {
  const environment = await getEnvironment();

  const entry = await environment.createEntry("post", {
    fields,
  });

  await entry.publish();

  return entry;
}

function fetchGraphQL(query, preview = false, url = "") {
  return API.request({
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
      }`,
    },
    data: JSON.stringify({ query }),
  });
}

function extractArticle(fetchResponse) {
  return fetchResponse?.data?.categoryCollection?.items?.[0];
}

function extractArticleEntries(fetchResponse) {
  return fetchResponse?.data?.categoryCollection?.items;
}

export async function getPreviewArticleBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      categoryCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractArticle(entry);
}

export async function getAllArticlesWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      categoryCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`
  );
  return extractArticleEntries(entries);
}

// export async function getAllArticlesForHome(preview) {
//   const entries = await fetchGraphQL(
//     `query {
//       categoryCollection(order: date_DESC, preview: ${
//         preview ? "true" : "false"
//       }) {
//         items {
//           ${ARTICLE_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     preview
//   );

//   return extractArticleEntries(entries);
// }

export async function getAllArticlesForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      Awards: awardsCollection(order: date_DESC, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
      Features: featuresCollection(order: date_DESC, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
      General_News: generalNewsCollection(order: date_DESC, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
      Op_Eds: opEdsCollection(order: date_DESC, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  return entries;
}

export async function getArticleAndMoreArticles(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      categoryCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      categoryCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${ARTICLE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    Article: extractArticle(entry),
    moreArticles: extractArticleEntries(entries),
  };
}
