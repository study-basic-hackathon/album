import { type components } from "../types/api";
import { arrangers } from "../mocks/data/arranger";
import { categories } from "../mocks/data/categories";
import { exhibitions } from "../mocks/data/exhibitions";
import { materials } from "../mocks/data/materials";
import { seasons } from "../mocks/data/seasons";
import { works } from "../mocks/data/works";
import "./work.css";

type Arranger = components["schemas"]["Arranger"];
type Category = components["schemas"]["Category"];
type Exhibition = components["schemas"]["Exhibition"];
type Material = components["schemas"]["Material"];
type Season = components["schemas"]["Season"];
type Work = components["schemas"]["Work"];

// ToDo: arranger_id, work_id を URL パラメータから取得するように変更
const arranger_id: number = 1;
const work_id: number = 1;
const work: Work = works[work_id];

// ToDo: これらの定数の取得処理は、関数として切り出したほうが良いかも
const arranger: Arranger = arrangers[work.arranger_id];
const category: Category = categories[work.category_id];
const exhibition: Exhibition = exhibitions[work.exhibition_id]; // ToDo: exhibition_id が null の場合の処理
const materialArray: Material[] = work.material_ids.map((material_id) => materials[material_id]);
const season: Season = seasons[work.season_id];

// ToDo: 作品ページ共通で使えるようにコンポーネント化する
function WorkImages({ work }: { work: Work }) {
  return (
    <>
      <h2>作品写真</h2>
      <div>
        <ul role="list" className="work-image-list">
          {work.image_urls.map((url, index) => (
            <li key={index} className="work-image-list__image">
              <img
                src={url}
                alt={`${work.title ? work.title : "無題の作品"}` + `${index + 1}枚目`}
                width={"100%"}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// `Exhibition.tsx` の `getWorksForExhibition` はここでも必要になりそう
// ToDo: 作品を並べる順番の基準はどのパラメータにするか検討する
// ToDo: 作品ページ共通で使えるようにコンポーネント化する
function AdjacentNavigation() {
  return (
    <nav className="adjacent-nav">
      <ul>
        <li>
          <a href={""}>前の作品</a>
        </li>
        <li>
          <a href={""}>次の作品</a>
        </li>
      </ul>
    </nav>
  );
}

// ToDo: 作品ページ共通で使えるようにコンポーネント化する
function WorkMetadata({
  arranger,
  category,
  exhibition,
  materialArray,
  season,
  work,
}: {
  arranger: Arranger;
  category: Category;
  exhibition: Exhibition;
  materialArray: Material[];
  season: Season;
  work: Work;
}) {
  return (
    <section className="work-metadata">
      <h2>作品情報</h2>
      <dl>
        <div>
          <dt>タイトル</dt>
          <dd>{work.title ? work.title : "無題の作品"}</dd>
        </div>
        <div>
          <dt>華展</dt>
          <dd>{exhibition.name}</dd>
        </div>
        <div>
          <dt>作者</dt>
          <dd>{arranger.name}</dd>
        </div>
        <div>
          <dt>季節</dt>
          <dd>{season.name}</dd>
        </div>
        <div>
          <dt>素材</dt>
          {materialArray.length === 0 ? (
            <dd>不明</dd>
          ) : (
            <dd>
              <ul className="work-metadata__materials">
                {materialArray.map((material) => (
                  <li key={material.id} className="work-metadata__material">
                    {material.name}
                  </li>
                ))}
              </ul>
            </dd>
          )}
        </div>
        <div>
          <dt>カテゴリー</dt>
          <dd>{category.name}</dd>
        </div>
      </dl>
    </section>
  );
}

export default function ExhibitionWork() {
  return (
    <>
      <main>
        <h1>{arrangers[arranger_id].name}の作品</h1>
        <WorkImages work={work} />
        <AdjacentNavigation />
        <WorkMetadata
          arranger={arranger}
          category={category}
          exhibition={exhibition}
          materialArray={materialArray}
          season={season}
          work={work}
        />
      </main>
    </>
  );
}
