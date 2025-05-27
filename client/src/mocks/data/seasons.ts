import { type components } from '../../types/api';

type Season = components['schemas']['Season'];

export const seasons: Record<number, Season> = {
  1: {
    id: 1,
    name: "春",
  },
  2: {
    id: 2,
    name: "夏",
  },
  3: {
    id: 3,
    name: "秋",
  },
  4: {
    id: 4,
    name: "冬",
  }
}
