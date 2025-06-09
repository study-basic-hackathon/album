import { type components } from "../types/api";
import { works } from "../mocks/data/works";
import { materials } from "../mocks/data/materials";
import "./works.css"; // ToDo: CSS のインポートの変更

type Work = components["schemas"]["Work"];
type Material = components["schemas"]["Material"];

const material_id: number = 6; // ToDo: material_id を URL パラメータから取得するように変更

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
              <img
                className="works-image-list__image"
                src={work.image_urls[0]}
                alt={work.title ? work.title : "無題の作品"}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function Material() {
  return (
    <>
      <main>
        <h1>{materials[material_id].name}の作品一覧</h1>
        <MaterialImages material_id={material_id} />
      </main>
    </>
  );
}
