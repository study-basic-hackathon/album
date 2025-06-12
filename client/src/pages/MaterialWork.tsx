import { type components } from "../types/api";
import { arrangers } from "../mocks/data/arranger";
import { categories } from "../mocks/data/categories";
import { exhibitions } from "../mocks/data/exhibitions";
import { materials } from "../mocks/data/materials";
import { seasons } from "../mocks/data/seasons";
import { works } from "../mocks/data/works";
import "./work.css";
import { useParams, Link } from "react-router";
import WorkImages from "../components/WorkImages";
import WorkMetadata from "../components/WorkMetadata";

type Arranger = components["schemas"]["Arranger"];
type Category = components["schemas"]["Category"];
type Exhibition = components["schemas"]["Exhibition"];
type Material = components["schemas"]["Material"];
type Season = components["schemas"]["Season"];
type Work = components["schemas"]["Work"];
type WorkListNavigation = components["schemas"]["WorkListNavigation"];

const workListNavigation: WorkListNavigation = {
  previous: 1,
  next: 3,
}; // workListNavigation は仮のデータ

function WorkHeading({ material }: { material: Material }) {
  const title: string = material.name;
  const works_url: string = `/material/${material.id}`;

  return (
    <>
      <h1>{title}の作品</h1>
      <nav>
        <Link to={works_url}>作品一覧へ戻る</Link>
      </nav>
    </>
  );
}

// ToDo: 作品ページ共通で使えるようにコンポーネント化する
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

export default function MaterialWork() {
  const { material_id, work_id } = useParams();
  const work: Work = works[Number(work_id)]; // ToDo: work_id が無効な値のときのエラーハンドリング
  const arranger: Arranger = arrangers[work.arranger_id];
  const category: Category = categories[work.category_id];
  const exhibition: Exhibition = exhibitions[work.exhibition_id]; // ToDo: exhibition_id が null の場合の処理
  const materialArray: Material[] = work.material_ids.map((material_id) => materials[material_id]);
  const season: Season = seasons[work.season_id];

  const material: Material = materials[Number(material_id)]; // このコンポーネント限定で必要になる定数

  return (
    <>
      <main>
        <WorkHeading material={material} />
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
