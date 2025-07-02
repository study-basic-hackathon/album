import { type components } from "../types/api";
import { Link } from "react-router";
import { useArranger } from "../hooks/arranger";
import { useCategory } from "../hooks/category";
import { useExhibition } from "../hooks/exhibition";
import { useMaterials } from "../hooks/material";
import { useSeason } from "../hooks/season";
import HeadingSub from "./HeadingSub";
import styles from "./scss/work-metadata.module.scss";

type Work = components["schemas"]["Work"];

export default function WorkMetadata({ work }: { work: Work }) {
  const arranger = useArranger(work?.arranger_id);
  const category = useCategory(work?.category_id);
  const exhibition = useExhibition(work?.exhibition_id);
  const materials = useMaterials(work?.material_ids);
  const season = useSeason(work?.season_id);

  // TODO: ローディングと不正なアクセスを切り分けて表示する
  if (!work || !arranger || !category || !exhibition || !materials || !season) {
    return <p>作品情報の読み込み中</p>;
  }

  return (
    <section>
      <HeadingSub title="作品情報" />
      <dl className={styles.metadata}>
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
          <dd>
            <Link to={`/arranger/${arranger.id}`}>{arranger.name}</Link>
          </dd>
        </div>
        <div>
          <dt>季節</dt>
          <dd>
            <Link to={`/season/${season.id}`}>{season.name}</Link>
          </dd>
        </div>
        <div>
          <dt>素材</dt>
          {materials.length === 0 ? (
            <dd>登録なし</dd>
          ) : (
            <dd>
              <ul className={styles.materials}>
                {materials.map((material) => (
                  <li key={material.id} className="work-metadata__material">
                    <Link to={`/material/${material.id}`}>{material.name}</Link>
                  </li>
                ))}
              </ul>
            </dd>
          )}
        </div>
        <div>
          <dt>カテゴリー</dt>
          <dd>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </dd>
        </div>
      </dl>
    </section>
  );
}
