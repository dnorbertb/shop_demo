import { stringify } from "qs";
import type { PaginatedResponse } from "../shared";
import { convertArticlePayload } from "./converter";
import type { ArticlePayload, ArticleData, GetArticlesArgs } from "./types";

export const useArticlesApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");
  const apiRoute = API_URL + "/api/articles";

  const getArticles = async (
    args?: GetArticlesArgs
  ): Promise<PaginatedResponse<ArticleData>> => {
    const { page = 1, limit = 6, tag, url } = args ?? {};

    const queryObject = {
      where: {
        "meta.url": {
          equals: url,
        },
        "meta.tags": {
          contains: tag,
        },
      },
    };

    const whereQueryString = stringify(queryObject);
    const payload = await $fetch<PaginatedResponse<ArticlePayload>>(
      `${apiRoute}?depth=999&page=${page}&limit=${limit}&sort=-createdAt${
        whereQueryString ? `&${whereQueryString}` : ""
      }`,
      {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      ...payload,
      docs: payload.docs.map((payload) => convertArticlePayload(payload)),
    };
  };

  const getOneByUrl = async (args?: { url: string }): Promise<ArticleData> => {
    const { url } = args ?? {};

    const queryObject = {
      where: {
        "meta.url": {
          equals: url,
        },
      },
    };

    const whereQueryString = stringify(queryObject);

    const payload = await $fetch<PaginatedResponse<ArticlePayload>>(
      `${apiRoute}?depth=5&${whereQueryString}`,
      {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!payload.docs[0]) throw new Error("Not found");
    return convertArticlePayload(payload.docs[0]);
  };

  return {
    getOneByUrl,
    getArticles,
  };
};
