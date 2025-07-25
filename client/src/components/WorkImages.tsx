import { type components } from "../types/api";
import HeadingSub from "./HeadingSub";
import Fallback from "./Fallback";
import styles from "./scss/work-images.module.scss";
type Work = components["schemas"]["Work"];

export default function WorkImages({ work }: { work: Work }) {
  if (!work || !work.image_ids || work.image_ids.length === 0) {
    return <Fallback message="この作品の写真は登録されていません" />;
  }
  return (
    <section>
      <HeadingSub title="作品写真" />
      <div>
        <ul role="list" className={styles.images}>
          {work.image_ids.map((id, index) => (
            <li key={index}>
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/images/${id}`}
                alt={`${work.title ? work.title : "無題の作品"}` + `${index + 1}枚目`}
                width={"100%"}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
