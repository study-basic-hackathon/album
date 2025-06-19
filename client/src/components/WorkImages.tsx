import { type components } from "../types/api";
type Work = components["schemas"]["Work"];

export default function WorkImages({ work }: { work: Work }) {
  if (!work || !work.image_ids || work.image_ids.length === 0) {
    return <p>この作品には写真がありません。</p>;
  }
  return (
    <>
      <h2>作品写真</h2>
      <div>
        <ul role="list" className="work-image-list">
          {work.image_ids.map((id, index) => (
            <li key={index} className="work-image-list__image">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/images/${id}`}
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
