import { type components } from "../types/api";
import { Link } from "react-router";

type Arranger = components["schemas"]["Arranger"];
type Category = components["schemas"]["Category"];
type Exhibition = components["schemas"]["Exhibition"];
type Material = components["schemas"]["Material"];
type Season = components["schemas"]["Season"];
type Work = components["schemas"]["Work"];

export default function WorkMetadata({
  arranger,
  category,
  exhibition,
  materials,
  season,
  work,
}: {
  arranger: Arranger;
  category: Category;
  exhibition: Exhibition;
  materials: Material[];
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
              <ul className="work-metadata__materials">
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
