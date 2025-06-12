import { type components } from "../types/api";
import { arrangers } from "../mocks/data/arranger";
import { categories } from "../mocks/data/categories";
import { exhibitions } from "../mocks/data/exhibitions";
import { materials } from "../mocks/data/materials";
import { seasons } from "../mocks/data/seasons";
import { works } from "../mocks/data/works";
import "./work.css";
import { useParams, useLocation, Link, NavLink, type Location } from "react-router";

type Arranger = components["schemas"]["Arranger"];
type Category = components["schemas"]["Category"];
type Exhibition = components["schemas"]["Exhibition"];
type Material = components["schemas"]["Material"];
type Season = components["schemas"]["Season"];
type Work = components["schemas"]["Work"];
type WorkListNavigation = components["schemas"]["WorkListNavigation"];

const workListNavigation: WorkListNavigation = {
  previous: null,
  next: 2,
}; // workListNavigation は仮のデータ

// location.state に依存する
function WorkHeading({ location, work }: { location: Location; work: Work }) {

  if (!location.state || !location.state.from || !location.state.id) {
    return <h1>{work.title ? work.title : "無題の作品"}</h1>; // location.state がない場合 (i.e. 作品ページに直接アクセスした場合) のフォールバック
  }

  const from: string = location.state.from;
  const from_id: number = location.state.id;

  let title: string;
  let works_url: string;

  if (from === "exhibition") {
    title = `${exhibitions[from_id].name}`;
    works_url = `/${from}/${from_id}`;
  } else {
    return <h1>{work.title ? work.title : "無題の作品"}</h1>; // 定義されていないページから、謎の方法で遷移した場合のフォールバック
  }

  return (
    <>
      <h1>{title}の作品</h1>
      <nav>
        <Link to={works_url}>作品一覧へ戻る</Link>
      </nav>
    </>
  );
}

// location.state に依存しない
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

// location.state に依存する
function AdjacentNavigation({ workListNavigation }: { workListNavigation: WorkListNavigation }) {
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

// location.state に依存しない
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
          <dd>
            <Link to={`/exhibition/${exhibition.id}`}>{exhibition.name}</Link>
          </dd>
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

export default function Work() {
  const { id } = useParams();
  const work: Work = works[Number(id)]; // ToDo: id が無効な値のときのエラーハンドリング
  const arranger: Arranger = arrangers[work.arranger_id];
  const category: Category = categories[work.category_id];
  const exhibition: Exhibition = exhibitions[work.exhibition_id]; // ToDo: exhibition_id が null の場合の処理
  const materialArray: Material[] = work.material_ids.map((material_id) => materials[material_id]);
  const season: Season = seasons[work.season_id];

  const location = useLocation(); // ToDo: location.state が空のときのエラーハンドリング

  return (
    <>
      <header>
        <nav>
          <NavLink to="/">ホームへ戻る</NavLink>
        </nav>
      </header>
      <main>
        <WorkHeading location={location} work={work} />
        <WorkImages work={work} />
        <AdjacentNavigation workListNavigation={workListNavigation} />
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
