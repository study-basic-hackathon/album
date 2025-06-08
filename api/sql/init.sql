-- 華展テーブル
CREATE TABLE IF NOT EXISTS exhibition (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  started_date DATE NOT NULL,
  ended_date DATE NOT NULL
);
COMMENT ON TABLE exhibition IS '華展テーブル';
COMMENT ON COLUMN exhibition.id IS '華展ID';
COMMENT ON COLUMN exhibition.name IS '華展名';
COMMENT ON COLUMN exhibition.started_date IS '開始日';
COMMENT ON COLUMN exhibition.ended_date IS '終了日';

-- 作者テーブル
CREATE TABLE IF NOT EXISTS arranger (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);
COMMENT ON TABLE arranger IS '作者テーブル';
COMMENT ON COLUMN arranger.id IS '作者ID';
COMMENT ON COLUMN arranger.name IS '作者名';

-- 作品分類テーブル
CREATE TABLE IF NOT EXISTS category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);
COMMENT ON TABLE category IS '作品分類テーブル';
COMMENT ON COLUMN category.id IS '作品分類ID';
COMMENT ON COLUMN category.name IS '作品分類名';

-- 花材テーブル
CREATE TABLE IF NOT EXISTS material (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);
COMMENT ON TABLE material IS '花材テーブル';
COMMENT ON COLUMN material.id IS '花材ID';
COMMENT ON COLUMN material.name IS '花材名';

-- 季節テーブル
CREATE TABLE IF NOT EXISTS season (
  id SERIAL PRIMARY KEY,
  name VARCHAR(10)
);
COMMENT ON TABLE season IS '季節テーブル';
COMMENT ON COLUMN season.id IS '季節ID';
COMMENT ON COLUMN season.name IS '季節名';

-- 作品テーブル
CREATE TABLE IF NOT EXISTS work (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  exhibition_id INTEGER REFERENCES exhibition(id),
  arranger_id INTEGER REFERENCES arranger(id),
  category_id INTEGER REFERENCES category(id),
  season_id INTEGER REFERENCES season(id),
  create_date DATE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE work IS '作品テーブル';
COMMENT ON COLUMN work.id IS '作品ID';
COMMENT ON COLUMN work.title IS 'タイトル';
COMMENT ON COLUMN work.exhibition_id IS '華展ID';
COMMENT ON COLUMN work.arranger_id IS '作者ID';
COMMENT ON COLUMN work.category_id IS '作品分類ID';
COMMENT ON COLUMN work.season_id IS '季節ID';
COMMENT ON COLUMN work.create_date IS '登録日';

-- 作品 + 花材 -> 複合キーテーブル
CREATE TABLE IF NOT EXISTS work_material (
  work_id INTEGER NOT NULL,
  material_id INTEGER NOT NULL,
  PRIMARY KEY (work_id, material_id),
  FOREIGN KEY (work_id) REFERENCES work(id),
  FOREIGN KEY (material_id) REFERENCES material(id)
);
COMMENT ON TABLE work_material IS '作品_花材テーブル';
COMMENT ON COLUMN work_material.work_id IS '作品ID';
COMMENT ON COLUMN work_material.material_id IS '花材ID';

-- 画像テーブル
CREATE TABLE IF NOT EXISTS image (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  work_id INTEGER REFERENCES work(id),
  create_date DATE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE image IS '画像テーブル';
COMMENT ON COLUMN image.id IS '画像ID';
COMMENT ON COLUMN image.url IS '画像URL';
COMMENT ON COLUMN image.work_id IS '作品ID';
COMMENT ON COLUMN image.create_date IS '登録日';

INSERT INTO exhibition (
  name,
  started_date,
  ended_date
) VALUES 
  ('春の展覧会', '2023-03-01', '2023-05-31'),
  ('夏の展覧会', '2023-06-01', '2023-08-31');

INSERT INTO arranger (
  name
) VALUES 
  ('田中太郎'),
  ('佐藤花子'),
  ('鈴木一郎'),
  ('高橋次郎'),
  ('伊藤三郎'),
  ('山田四郎'),
  ('小林五郎');

INSERT INTO season (
  name
) VALUES 
  ('春'),
  ('夏'),
  ('秋'),
  ('冬');

INSERT INTO material (name) VALUES
('菊'),
('桜'),
('梅'),
('松'),
('竹'),
('柳'),
('楓'),
('柿'),
('栗'),
('桃');

INSERT INTO category (
  name
) VALUES 
  ('格花'),
  ('新花'),
  ('造形');

INSERT INTO work (
  title,
  exhibition_id,
  arranger_id,
  category_id,
  season_id
) VALUES 
  ('作品1',  1, 1, 1, 1),
  ('作品2',  1, 2, 1, 1),
  ('作品3',  1, 3, 2, 1),
  ('作品4',  1, 4, 2, 1),
  ('作品5',  1, 5, 3, 1),
  ('作品6',  1, 6, 3, 1),
  ('作品7',  1, 7, 3, 1),
  ('作品8',  2, 1, 1, 1),
  ('作品9',  2, 2, 1, 2),
  ('作品10',  2, 3, 2, 2),
  ('作品11',  2, 4, 2, 2),
  ('作品12',  2, 5, 3, 2),
  ('作品13',  2, 6, 3, 2),
  ('作品14',  2, 7, 3, 2);

INSERT INTO work_material (work_id, material_id) VALUES
  (1, 2),
  (2, 1),
  (2, 2),
  (3, 2),
  (3, 3),
  (3, 4),
  (4, 1),
  (5, 3),
  (6, 2),
  (7, 1),
  (8, 3),
  (9, 2),
  (10, 1),
  (11, 3),
  (12, 2),
  (13, 1),
  (14, 3)
  ON CONFLICT (work_id, material_id) DO NOTHING; 

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