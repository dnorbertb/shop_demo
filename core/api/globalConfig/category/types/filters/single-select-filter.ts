export type SingleOptionFilter = {
  type: "singleOption";
  label: string;
  code: string;
  options: Array<{
    label: string;
    code: string;
  }>;
};
