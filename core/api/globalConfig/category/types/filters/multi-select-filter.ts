export type ManyOptionsFilter = {
  type: "manyOptions";
  label: string;
  code: string;
  options: Array<{
    label: string;
    code: string;
  }>;
};
