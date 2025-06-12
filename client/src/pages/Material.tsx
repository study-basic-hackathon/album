import { type components } from "../types/api";
import { works } from "../mocks/data/works";
import { materials } from "../mocks/data/materials";
import "./works.css"; // ToDo: CSS のインポートの変更
import { Link, useParams } from "react-router";

type Work = components["schemas"]["Work"];
type Material = components["schemas"]["Material"];

function getWorksForMaterial(materialId: number): Work[] {
  return Object.values(works).filter((work) => work.material_ids.includes(materialId));
}

function MaterialImages({ material_id }: { material_id: number }) {
  if (!material_id) {
    return <p>No material selected.</p>;
  }
  const materialWorks = getWorksForMaterial(material_id);
  return (
    <>
      <div>
        <ul role="list" className="works-image-list">
          {materialWorks.map((work, index) => (
            <li key={index}>
              <Link to={`work/${work.id}`}>
                <img
                  className="works-image-list__image"
                  src={work.image_urls[0]}
                  alt={work.title ? work.title : "無題の作品"}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Material() {
  const params = useParams();
  const material_id = Number(params.material_id); // ToDo: material_id が無効な値のときのエラーハンドリング

  return (
    <>
      <main>
        <h1>{materials[material_id].name}の作品一覧</h1>
        <MaterialImages material_id={material_id} />
      </main>
    </>
  );
}
