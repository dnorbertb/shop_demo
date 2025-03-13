import { convertImagePayload } from "~/core/api/media";
import type { GlobalDataPayload, GlobalData } from "./types";

export const convertGlobalDataPayload = (
  payload: GlobalDataPayload
): GlobalData => {
  const { logoDark, logoLight } = payload;
  return {
    logoDark: convertImagePayload(logoDark),
    logoLight: convertImagePayload(logoLight),
  };
};
