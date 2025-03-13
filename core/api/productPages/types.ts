import type { ProductData, ProductPayload } from "../products";
import type { ImageData, ImagePayload } from "../media";
import type { ManufacturerData, ManufacturerPayload } from "../manufacturer";
import type { CategoryData, CategoryPayload } from "../globalConfig/category";
import type { RichTextData, Entity, RichTextPayload } from "../shared";

export type ProductPagePayload = Entity<{
  name: string;
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  category: CategoryPayload;
  manufacturer: ManufacturerPayload;
  gallery: Array<{
    id: string;
    label: string;
    images: Array<{
      id: string;
      image: ImagePayload;
    }>;
  }>;
  shortDescription: RichTextPayload;
  description: RichTextPayload;
  productMap: Array<{
    id: string;
    label: string;
    variantId: string;
    product: ProductPayload;
    galleryIdentifier: number;
  }>;
}>;

export type ProductPageData = {
  id: string;
  name: string;
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  category: CategoryData;
  manufacturer: ManufacturerData;
  gallery: Array<{
    id: string;
    label: string;
    images: Array<ImageData>;
  }>;
  shortDescription: RichTextData;
  description: RichTextData;
  productMap: Array<{
    id: string;
    label: string;
    variantId: string;
    product: ProductData;
    galleryIdentifier: number;
  }>;
  createdAt: string;
  updatedAt: string;
};

interface RootObject {
  id: string;
  metaTitle: string;
  metaDescription: string;
  name: string;
  slug: string;
  category: Category;
  manufacturer: Manufacturer;
  gallery: Gallery[];
  shortDescription: ShortDescription[];
  description: Description[];
  productMap: ProductMap[];
}

interface ProductMap {
  product: Product;
  label: string;
  variantId: string;
  galleryIdentifier: number;
  id: string;
}

interface Product {
  id: string;
  updatedAt: string;
  updateData: UpdateData4;
  searchMeta: SearchMeta;
  miniature: string;
  manufacturer: string;
  category: string;
  name: string;
  parameters: Parameter[];
  otherParameters: OtherParameter[];
  manufacturerId: string;
  ean: string;
  sku: string;
  otherCodes: OtherParameter[];
  pricing: Pricing;
  stock: Stock;
  _status: string;
  createdAt: string;
  productPage: string;
  productUrl: string;
  title: string;
}

interface Stock {
  availability: number;
}

interface Pricing {
  netto: number;
  vatRate: string;
  vat: number;
  brutto: number;
}

interface OtherParameter {
  type: string;
  value: string;
  id: string;
}

interface Parameter {
  label: string;
  code: string;
  valueLabel: string;
  value: string;
  isIdentifier: boolean;
  id: string;
}

interface SearchMeta {
  manufacturerName: string;
  searchTags: string;
}

interface UpdateData4 {
  userType: string;
}

interface Description {
  children: Child2[];
  type?: string;
  relationTo?: string;
  value?: Image;
}

interface Child2 {
  text: string;
}

interface ShortDescription {
  children: Child[];
}

interface Child {
  text: string;
  bold?: boolean;
}

interface Gallery {
  images: Image2[];
}

interface Image2 {
  image: Image;
  id: string;
}

interface Image {
  id: string;
  updateData: UpdateData3;
  alt: string;
  b64loader: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  sizes: Sizes;
  createdAt: string;
  updatedAt: string;
  url: string;
  thumbnailURL: string;
}

interface Sizes {
  loader: Loader;
  mobile: Loader;
  standard: Loader;
  big: Loader;
}

interface Loader {
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
  url: string;
}

interface Manufacturer {
  id: string;
  updateData: UpdateData3;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  updateData: UpdateData3;
  name: string;
  slug: string;
  searchTags: string;
  logo: string;
  filters: Filter[];
  createdAt: string;
  updatedAt: string;
}

interface Filter {
  type: string;
  label: string;
  mainParameter?: boolean;
  code: string;
  options: Option[];
  id: string;
}

interface Option {
  label: string;
  code: string;
  id: string;
}

interface UpdateData3 {
  userType: string;
  createdBy: string;
  updatedBy: string;
}

interface UpdateData2 {
  userType: string;
  createdBy: CreatedBy;
  updatedBy: CreatedBy;
}

interface CreatedBy {
  id: string;
  updateData: UpdateData;
  name: string;
  phone: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  loginAttempts: number;
}

interface UpdateData {
  userType: string;
  updatedBy: string;
}
