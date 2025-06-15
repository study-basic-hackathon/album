import { arranger } from './arranger'
import { category } from './category'
import { exhibition } from './exhibition'
import { image } from './image'
import { material } from './material'
import { season } from './season'
import { work } from './work'

export const handlers = [
  ...arranger,
  ...category,
  ...exhibition,
  ...image,
  ...material,
  ...season,
  ...work
];
