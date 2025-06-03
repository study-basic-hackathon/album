CREATE TABLE IF NOT EXISTS post (
  id SERIAL PRIMARY KEY,
  body VARCHAR(100) NOT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
CREATE TABLE IF NOT EXISTS author (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);
COMMENT ON TABLE author IS '作者テーブル';
COMMENT ON COLUMN author.id IS '作者ID';
COMMENT ON COLUMN author.name IS '作者名';

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

-- 季節
CREATE TABLE IF NOT EXISTS season (
  id SERIAL PRIMARY KEY,
  name VARCHAR(10) NOT NULL
)
COMMENT ON TABLE category IS '季節テーブル';
COMMENT ON COLUMN category.id IS '季節ID';
COMMENT ON COLUMN category.name IS '季節名';

-- 作品テーブル
CREATE TABLE IF NOT EXISTS work (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  exhibition_id INTEGER REFERENCES exhibition(id),
  author_id INTEGER REFERENCES author(id),
  category_id INTEGER REFERENCES category(id),
  season _id INTEGER REFERENCES season(id),
  create_date DATE DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE work IS '作品テーブル';
COMMENT ON COLUMN work.id IS '作品ID';
COMMENT ON COLUMN work.title IS 'タイトル';
COMMENT ON COLUMN work.season IS '季節';
COMMENT ON COLUMN work.exhibition_id IS '華展ID';
COMMENT ON COLUMN work.author_id IS '作者ID';
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