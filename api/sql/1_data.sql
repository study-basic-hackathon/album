INSERT INTO exhibition (
  id,
  name,
  started_date,
  ended_date
) VALUES
  (1,'春の展覧会', '2023-03-01', '2023-05-31'),
  (2, '夏の展覧会', '2023-06-01', '2023-08-31');

INSERT INTO arranger (
  id,
  name
) VALUES
  (1, '田中太郎'),
  (2, '佐藤花子'),
  (3, '鈴木一郎'),
  (4, '高橋次郎'),
  (5, '伊藤三郎'),
  (6, '山田四郎'),
  (7, '小林五郎');

INSERT INTO category (
  id,
  name
) VALUES
  (1, '造形'),
  (2, '新花'),
  (3, '格花');

INSERT INTO material (
  id,
  name
) VALUES
  (1,'菊'),
  (2,'桜'),
  (3,'梅'),
  (4,'松'),
  (5,'竹'),
  (6,'柳'),
  (7,'楓'),
  (8,'柿'),
  (9,'栗'),
  (10,'桃');

INSERT INTO season (
  id,
  name
) VALUES
  (1, '春'),
  (2, '夏'),
  (3, '秋'),
  (4, '冬');

INSERT INTO work (
  id,
  title,
  exhibition_id,
  arranger_id,
  season_id,
  category_id
) VALUES
  (1, '作品1', 1, 1, 1, 1),
  (2, '作品2', 1, 2, 1, 1),
  (3, '作品3', 1, 3, 2, 1),
  (4, '作品4', 1, 4, 2, 1),
  (5, '作品5', 1, 5, 3, 1),
  (6, '作品6', 1, 6, 3, 1),
  (7, '作品7', 1, 7, 3, 1),
  (8, '作品1', 2, 1, 1, 2),
  (9, '作品2', 2, 2, 1, 2),
  (10, '作品3', 2, 3, 2, 2),
  (11, '作品4', 2, 4, 2, 2),
  (12, '作品5', 2, 5, 3, 2),
  (13, '作品6', 2, 6, 3, 2),
  (14, '作品7', 2, 7, 3, 2);

INSERT INTO work_material (
  work_id,
  material_id
) VALUES
  (1,1),
  (1,3),
  (1,8),
  (1,7),
  (2,2),
  (2,5),
  (2,3),
  (3,3),
  (3,6),
  (3,9),
  (3,10),
  (4,4),
  (4,6),
  (4,9),
  (5,5),
  (5,7),
  (6,6),
  (6,10),
  (7,3),
  (7,5),
  (7,8),
  (8,9),
  (9,10),
  (10,1),
  (10,5),
  (10,6),
  (11,8),
  (12,9),
  (12,10),
  (13,10),
  (14,7),
  (14,8),
  (14,9);

INSERT INTO image (work_id, url) VALUES
  (1, 'http://localhost:3000/images/1_0.jpg'),
  (1, 'http://localhost:3000/images/1_1.jpg'),
  (2, 'http://localhost:3000/images/2_0.jpg'),
  (2, 'http://localhost:3000/images/2_1.jpg'),
  (2, 'http://localhost:3000/images/2_2.jpg'),
  (3, 'http://localhost:3000/images/3_0.jpg'),
  (4, 'http://localhost:3000/images/4_0.jpg'),
  (4, 'http://localhost:3000/images/4_1.jpg'),
  (4, 'http://localhost:3000/images/4_2.jpg'),
  (4, 'http://localhost:3000/images/4_3.jpg'),
  (5, 'http://localhost:3000/images/5_0.jpg'),
  (6, 'http://localhost:3000/images/6_0.jpg'),
  (6, 'http://localhost:3000/images/6_1.jpg'),
  (6, 'http://localhost:3000/images/6_2.jpg'),
  (7, 'http://localhost:3000/images/7_0.jpg'),
  (7, 'http://localhost:3000/images/7_1.jpg'),
  (8, 'http://localhost:3000/images/8_0.jpg'),
  (9, 'http://localhost:3000/images/9_0.jpg'),
  (9, 'http://localhost:3000/images/9_1.jpg'),
  (10, 'http://localhost:3000/images/10_0.jpg'),
  (10, 'http://localhost:3000/images/10_1.jpg'),
  (11, 'http://localhost:3000/images/11_0.jpg'),
  (11, 'http://localhost:3000/images/11_1.jpg'),
  (11, 'http://localhost:3000/images/11_2.jpg'),
  (12, 'http://localhost:3000/images/12_0.jpg'),
  (12, 'http://localhost:3000/images/12_1.jpg'),
  (13, 'http://localhost:3000/images/13_0.jpg'),
  (14, 'http://localhost:3000/images/14_0.jpg'),
  (14, 'http://localhost:3000/images/14_2.jpg');
