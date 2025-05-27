import { type components } from '../../types/api';

type Category = components['schemas']['Category'];

export const categories: Record<number, Category> = {
  1: {
    id: 1,
    name: "格花",
  },
  2: {
    id: 2,
    name: "新花"
  },
  3: {
    id: 3,
    name: "造形"
  }
}
