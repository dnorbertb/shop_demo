import { convertImagePayload } from "~/core/api/media";
import type {
  CTASectionV1Data,
  CTASectionV1Payload,
  HomeHeroV1Data,
  HomeHeroV1Payload,
  LoopSectionData,
  LoopSectionPayload,
} from "./blocks";
import type { HomepageBlocksData, HomepageBlocksPayload } from "./blocks";
import { convertRichTextPayload } from "~/core/api/shared";
import type { HomepageConfigData, HomepageConfigPayload } from "./types";

// Split to separate functions
const convertersMap: Partial<
  Record<HomepageBlocksPayload["blockType"], Function>
> = {
  CTASectionV1: (payload: CTASectionV1Payload): CTASectionV1Data => {
    const { logoDark, logoLight, ...rest } = payload;
    return {
      ...rest,
      logoDark: convertImagePayload(logoDark),
      logoLight: convertImagePayload(logoLight),
    };
  },
  HomeHeroV1: (payload: HomeHeroV1Payload): HomeHeroV1Data => {
    const { image, description, ...rest } = payload;
    return {
      ...rest,
      description: convertRichTextPayload(description),
      image: convertImagePayload(image),
    };
  },
  LoopSection: (payload: LoopSectionPayload): LoopSectionData => {
    const { logos, ...rest } = payload;
    return {
      ...rest,
      logos: logos.map((logoData) => ({
        ...logoData,
        image: convertImagePayload(logoData.image),
      })),
    };
  },
};

const convertBlocks = (
  blocksPayload: Array<HomepageBlocksPayload>
): Array<HomepageBlocksData> => {
  return blocksPayload.map((payload) => {
    const converterFunction = convertersMap[payload.blockType];
    if (!converterFunction) return payload;
    return converterFunction(payload);
  });
};

export const convertHomepagePayload = (
  payload: HomepageConfigPayload
): HomepageConfigData => {
  const { blocks, ...rest } = payload;

  return {
    ...rest,
    blocks: convertBlocks(blocks),
  };
};
