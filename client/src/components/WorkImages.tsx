import { type components } from "../types/api";
type Work = components["schemas"]["Work"];

export default function WorkImages({ work }: { work: Work }) {
  return (
    <>
      <h2>作品写真</h2>
      <div>
        <ul role="list" className="work-image-list">
          {work.image_ids.map((id, index) => (
            <li key={index} className="work-image-list__image">
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/works/${id}`}
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
