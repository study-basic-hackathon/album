import { type components } from "../types/api";
import { useArranger } from "../api/arranger";
import { useCategory } from "../api/category";
import { useExhibition } from "../api/exhibition";
import { useMaterial } from "../api/material";
import { useSeason } from "../api/season";
import { useExhibitionWork } from "../api/exhibition";
import "./work.css";
import { Link, useParams } from "react-router";
import WorkImages from "../components/WorkImages";
import WorkMetadata from "../components/WorkMetadata";

type Arranger = components["schemas"]["Arranger"];
type Category = components["schemas"]["Category"];
type Exhibition = components["schemas"]["Exhibition"];
type Material = components["schemas"]["Material"];
type Season = components["schemas"]["Season"];
type Work = components["schemas"]["Work"];
type WorkListItem = components["schemas"]["WorkListItem"];
type WorkListNavigation = components["schemas"]["WorkListNavigation"];

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

function AdjacentNavigation({ navigation }: { navigation: WorkListNavigation }) {
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
  const params = useParams();
  const exhibitionId = Number(params.exhibitionId);
  const workId = Number(params.workId);
  const workListItem: WorkListItem = useExhibitionWork(exhibitionId, workId);
  console.log("workListItem", workListItem);
  const work: Work = workListItem?.work;
  const navigation: WorkListNavigation = workListItem?.navigation;

  if (!workListItem) {
    return (
      <main>
        <h1>ローディング中</h1>
      </main>
    );
  } else {
    return (
      <>
        <main>
          <WorkImages work={work} />
        </main>
      </>
    );
  }
  /*
  const arranger: Arranger = useArranger(work?.arranger_id);
  const category: Category = useCategory(work?.category_id);
  const exhibition: Exhibition = useExhibition(work?.exhibition_id);
  const materialArray: Material[] = work?.material_ids.map((material_id) =>
    useMaterial(material_id)
  );
  const season: Season = useSeason(work?.season_id);
  */
  /*
  if (!workListItem) {
    return (
      <main>
        <h1>指定された作品は存在しません</h1>
      </main>
    );
  }
  */
  /*
  return (
    <>
      <main>
        <WorkHeading exhibition={exhibition} />
        <WorkImages work={work} />
        <AdjacentNavigation navigation={navigation} />
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
  */
}
