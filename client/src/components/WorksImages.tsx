import { type components } from "../types/api";
import { Link } from "react-router";

type Work = components["schemas"]["Work"];

export default function WorksImages({ works }: { works: Work[] }) {
  return (
    <section>
      <ul role="list" className="works-image-list">
        {works.map((work, index) => (
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
    </section>
  );
}
