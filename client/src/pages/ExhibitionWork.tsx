import { type components } from "../types/api";
import { arrangers } from "../mocks/data/arranger";
import { categories } from "../mocks/data/categories";
import { exhibitions } from "../mocks/data/exhibitions";
import { materials } from "../mocks/data/materials";
import { seasons } from "../mocks/data/seasons";
import { works } from "../mocks/data/works";
import "./exhibition-work.css";

type Work = components["schemas"]["Work"];

// ToDo: exhibition_id, work_id を URL パラメータから取得するように変更
const exhibition_id: number = 1;
const work_id: number = 1;
const work: Work = works[work_id];

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

// ToDo: 作品ページ共通で使えるようにコンポーネント化する
function WorkMetadata({ work }: { work: Work }) {
  return (
    <section className="work-metadata">
      <h2>作品情報</h2>
      <dl>
        <div>
          <dt>タイトル</dt>
          <dd>{work.title ? work.title : "無題の作品"}</dd>
        </div>
        <div>
          <dt>作者</dt>
          <dd>{arrangers[work.arranger_id].name}</dd>
        </div>
        <div>
          <dt>季節</dt>
          <dd>{seasons[work.season_id].name}</dd>
        </div>
        <div>
          <dt>素材</dt>
          {work.material_ids.length === 0 ? (
            <dd>不明</dd>
          ) : (
            <dd>
              <ul className="work-metadata__materials">
                {work.material_ids.map((material_id) => (
                  <li key={material_id} className="work-metadata__material">
                    {materials[material_id].name}
                  </li>
                ))}
              </ul>
            </dd>
          )}
        </div>
        <div>
          <dt>カテゴリー</dt>
          <dd>{categories[work.category_id].name}</dd>
        </div>
      </dl>
    </section>
  );
}

export default function () {
  return (
    <>
      <main>
        <h1>{exhibitions[exhibition_id].name}</h1>
        <WorkImages work={work} />
        <WorkMetadata work={work} />
      </main>
    </>
  );
}
