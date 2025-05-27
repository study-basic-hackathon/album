import { type components } from '../../types/api';

type Work = components['schemas']['Work'];

export const works: Record<number, Work> = {
  1: {
    id: 1,
    title: "秋の彩り",
    author_id: 1,
    season_id: 1,
    exhibition_id: 1,
    material_ids: [
      1,
      2,
      3
    ],
    category_id: 1,
    image_urls: [
      'https://dummyimage.com/600x400/000/fff?text=Work+1',
      'https://dummyimage.com/1800x200/111/fff?text=Work+1+Image+2',
      'https://dummyimage.com/400x300/222/fff?text=Work+1+Image+3'
    ]
  },
  2: {
    id: 2,
    title: null,
    exhibition_id: 1,
    author_id: 2,
    season_id: 2,
    material_ids: [
      4,
      5
    ],
    category_id: 2,
    image_urls: [
      'https://dummyimage.com/600x400/333/fff?text=Work+2',
      'https://dummyimage.com/1800x200/444/fff?text=Work+2+Image+2'
    ]
  },
  3: {
    id: 3,
    exhibition_id: 1,
    title: "春の息吹",
    author_id: 3,
    season_id: 3,
    material_ids: [
      6,
      7,
      8
    ],
    category_id: 1,
    image_urls: [
      'https://dummyimage.com/600x400/555/fff?text=Work+3',
      'https://dummyimage.com/1800x200/666/fff?text=Work+3+Image+2',
      'https://dummyimage.com/400x300/777/fff?text=Work+3+Image+3'
    ]
  },
  4: {
    id: 4,
    title: "夏の輝き",
    exhibition_id: 2,
    author_id: 4,
    season_id: 4,
    material_ids: [
      9,
      10
    ],
    category_id: 2,
    image_urls: [
      'https://dummyimage.com/600x400/888/fff?text=Work+4',
      'https://dummyimage.com/1800x200/999/fff?text=Work+4+Image+2'
    ]
  },
  5: {
    id: 5,
    title: "冬の静寂",
    exhibition_id: 2,
    author_id: 1,
    season_id: 1,
    material_ids: [
      11,
      12
    ],
    category_id: 3,
    image_urls: [
      'https://dummyimage.com/600x400/aaa/fff?text=Work+5',
      'https://dummyimage.com/1800x200/bbb/fff?text=Work+5+Image+2'
    ]
  }
}
