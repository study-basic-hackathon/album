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
  previous: null,
  next: 2,
}; // workListNavigation は仮のデータ

function WorkHeading({ exhibition }: { exhibition: Exhibition }) {
  const title: string = exhibition.name;
  const works_url: string = `/exhibition/${exhibition.id}`;

  return (
    <>
      <h1>{title}の作品</h1>
      <nav>
        <Link to={works_url}>作品一覧へ戻る</Link>
      </nav>
    </>
  );
}

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

export default function ExhibitionWork() {
  const { exhibition_id, work_id } = useParams(); // exhibition_id はまだ使わないが、API 関連の実装時におそらく必要になる
  const work: Work = works[Number(work_id)]; // ToDo: work_id が無効な値のときのエラーハンドリング
  const arranger: Arranger = arrangers[work.arranger_id];
  const category: Category = categories[work.category_id];
  const exhibition: Exhibition = exhibitions[work.exhibition_id]; // ToDo: exhibition_id が null の場合の処理
  const materialArray: Material[] = work.material_ids.map((material_id) => materials[material_id]);
  const season: Season = seasons[work.season_id];

  return (
    <>
      <main>
        <WorkHeading exhibition={exhibition} />
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
