import { type components } from "../types/api";
import { Link } from "react-router";
import styles from "./scss/works-images.module.scss";

type Work = components["schemas"]["Work"];

export default function WorksImages({ works }: { works: Work[] }) {
  const fallbackImage = "https://dummyimage.com/480x480/202220/eff3f0.jpg&text=No+Image"; // 環境変数でもいいかも
  return (
    <section>
      <ul role="list" className={styles.images}>
        {works.map((work, index) => (
          <li key={index}>
            <Link to={`work/${work.id}`}>
              <img
                src={
                  work.image_ids?.length > 0
                    ? `${import.meta.env.VITE_API_BASE_URL}/images/${work.image_ids[0]}`
                    : fallbackImage
                }
                alt={work.title ? work.title : "無題の作品"}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
