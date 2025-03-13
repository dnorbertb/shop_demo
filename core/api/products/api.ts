import qs from "qs";
import type { PaginatedResponse } from "../shared";
import { convertProductPayload } from "./converter";
import type { ProductPayload, ProductData, GetProductsArgs } from "./types";

export const useProductApi = () => {
  const API_URL = useRuntimeConfig().public.API_URL;
  if (!API_URL) throw new Error("NO API_URL SET");
  const apiRoute = API_URL + "/api/products";

  const getProductById = async (id: string): Promise<ProductData> => {
    const payload = await $fetch<ProductPayload>(
      `${API_URL}/api/products/${id}?depth=999`,
      {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return convertProductPayload(payload);
  };

  const getProducts = async (
    args: GetProductsArgs
  ): Promise<PaginatedResponse<ProductData>> => {
    const {
      page = 1,
      limit = 12,
      category,
      filters: { search, price, ...dynamicFilters } = {},
      sortBy = "default",
    } = args;

    // Dynamic filters
    const dynamicFiltersAsArray = Object.entries(dynamicFilters);
    const convertedFiltersArray = dynamicFiltersAsArray.map(
      (filterKeyValues) => {
        const [key, value] = filterKeyValues;

        const whereQuery = {
          and: [
            {
              "parameters.code": {
                equals: key,
              },
            },
            {
              or: value.map((text) => ({
                "parameters.value": {
                  contains: text,
                },
              })),
            },
          ],
        };

        return whereQuery;
      }
    );

    // Keywords
    const textSearchableFields = [
      "name",
      "manufacturer.name",
      "category.name",
      "category.searchTags",
      "parameters.value",
      "otherParameters.value",
      "manufacturerId",
      "ean",
      "sku",
      "otherCodes.value",
    ];
    const textSearchFilters = textSearchableFields.map((field) => ({
      [field]: {
        like: search,
      },
    }));

    // Filters object
    const filtersObject = {
      page,
      limit,
      where: {
        and: [
          { "pricing.brutto": price },
          ...(category ? [{ category: { equals: category } }] : []),
          ...(search ? [{ or: textSearchFilters }] : []),
          ...convertedFiltersArray,
        ],
      },
      sort: sortBy == "default" ? undefined : sortBy,
    };

    const queryString = qs.stringify(filtersObject, { encode: true });

    // Request
    const data = await $fetch<PaginatedResponse<ProductPayload>>(
      `${apiRoute}?${queryString}&depth=5`,
      {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      ...data,
      docs: data.docs.map((payload) => convertProductPayload(payload)),
    };
  };

  return {
    getProductById,
    getProducts,
  };
};
