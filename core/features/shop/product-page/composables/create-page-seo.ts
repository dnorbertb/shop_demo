import type { ProductPageData } from "~/core/api/productPages";

type MetaData = {
  pageUrl: string;
  metaTitle: string;
  metaDescription: string;
  productName: string;
  productMap: ProductPageData["productMap"];
};

export const createProductPageSeo = (metaData: MetaData) => {
  const { productName, metaTitle, metaDescription, pageUrl, productMap } =
    metaData;

  const baseProduct = productMap[0].product;
  const image = baseProduct.miniature;
  const category = baseProduct.category;
  const manufacturer = baseProduct.manufacturer;

  // Creating meta
  useSeoMeta({
    ogLocale: "pl_PL",
    title: metaTitle,
    description: metaDescription,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
    ogImage: {
      alt: image.alt,
      url: image.srcSet[700],
      height: image.height,
      width: image.width,
      type: "image/webp" as any,
    },
  });

  useSchemaOrg([
    defineWebSite({
      url: `/${pageUrl}`,
      name: metaTitle,
      description: metaDescription,
      inLanguage: ["pl_PL", "PL"],
    }),
    defineBreadcrumb({
      itemListElement: [
        { name: "home", item: "/" },
        { name: category.name, item: `/${category.slug}` },
        { name: productName },
      ],
    }),
    defineProduct({
      name: productName,
      image: image?.srcSet[1280],
      offers: productMap.map((el) => ({
        availability:
          el.product.stock.availability > 0 ? "InStock" : "OutOfStock",
        priceCurrency: "PLN",
        price: el.product.pricing.brutto,
        image: el.product.miniature.srcSet[700],
      })),
      brand: {
        "@type": "Brand",
        name: manufacturer.name,
      },

      // aggregateRating: {
      //   ratingValue: 88,
      //   bestRating: 100,
      //   ratingCount: 20,
      // },
      // review: [
      //   {
      //     name: "Awesome product!",
      //     author: {
      //       name: "Harlan Wilton",
      //     },
      //     reviewRating: {
      //       ratingValue: 5,
      //     },
      //   },
      // ],
    }),
  ]);
};
