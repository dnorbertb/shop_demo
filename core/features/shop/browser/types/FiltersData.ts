type TextFilterData = string;
type SelectFilterData = Array<string>;
type NumberFilterData = {
  greater_than: string;
  less_than: string;
};

type FiltersDataTypes = TextFilterData | NumberFilterData | SelectFilterData;

export type FiltersData = Record<string, FiltersDataTypes>;
