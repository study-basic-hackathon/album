import { type components } from "../types/api";
import "./works.css"; // ToDo: CSS のインポートの変更
import { Link, useParams } from "react-router";
import { useMaterial, useMaterialWorkListItems } from "../hooks/material";

type Work = components["schemas"]["Work"];
type Material = components["schemas"]["Material"];

function MaterialImages({ materialWorks }: { materialWorks: Work[] }) {
  return (
    <>
      <div>
        <ul role="list" className="works-image-list">
          {materialWorks.map((work, index) => (
            <li key={index}>
              <Link to={`work/${work.id}`}>
                <img
                  className="works-image-list__image"
                  src={`${import.meta.env.VITE_API_BASE_URL}/images/${work.image_ids[0]}`}
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
  const materialId = Number(params.materialId);
  const material = useMaterial(materialId);
  const materialWorks: Work[] = Object.values(useMaterialWorkListItems(materialId)).map(
    (item) => item.work
  );

  if (!material || materialWorks.length === 0) {
    return (
      <main>
        <h1>指定された素材は存在しません</h1>
      </main>
    );
  }

  return (
    <>
      <main>
        <h1>{material.name}の作品一覧</h1>
        <MaterialImages materialWorks={materialWorks} />
      </main>
    </>
  );
}
