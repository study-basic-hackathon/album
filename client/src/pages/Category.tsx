import { type components } from "../types/api";
import "./works.css"; // ToDo: CSS のインポートの変更
import { Link, useParams } from "react-router";
import { useCategory, useCategoryWorkListItems } from "../hooks/category";

type Work = components["schemas"]["Work"];
type Category = components["schemas"]["Category"];

function CategoryImages({ categoryWorks }: { categoryWorks: Work[] }) {
  return (
    <>
      <div>
        <ul role="list" className="works-image-list">
          {categoryWorks.map((work, index) => (
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

export default function Category() {
  const params = useParams();
  const categoryId = Number(params.categoryId);
  const category = useCategory(categoryId);
  const categoryWorks: Work[] = Object.values(useCategoryWorkListItems(categoryId)).map(
    (item) => item.work
  );

  if (!category || categoryWorks.length === 0) {
    return (
      <main>
        <h1>指定されたカテゴリーは存在しません</h1>
      </main>
    );
  }

  return (
    <>
      <main>
        <h1>{category.name}の作品一覧</h1>
        <CategoryImages categoryWorks={categoryWorks} />
      </main>
    </>
  );
}
