import { type components } from "../../types/api";

export function worksToWorkListItem(
  works: components["schemas"]["Work"][]
): components["schemas"]["WorkListItem"][] {
  return works.map((work, index, works) => ({
    work: work,
    navigation: {
      next: index < works.length - 1 ? works[index + 1].id : null,
      previous: index > 0 ? works[index - 1].id : null,
    },
  }));
}
