import { type components } from "../types/api";
import { works } from "../mocks/data/works";
import { categories } from "../mocks/data/categories";
import "./works.css"; // ToDo: CSS のインポートの変更

type Work = components["schemas"]["Work"];
type Category = components["schemas"]["Category"];

const category_id: number = 3; // ToDo: category_id を URL パラメータから取得するように変更

function getWorksForCategory(categoryId: number): Work[] {
  return Object.values(works).filter((work) => work.category_id === categoryId);
}

function CategoryImages({ category_id }: { category_id: number }) {
  if (!category_id) {
    return <p>No category selected.</p>;
  }
  const categoryWorks = getWorksForCategory(category_id);
  return (
    <>
      <div>
        <ul role="list" className="works-image-list">
          {categoryWorks.map((work, index) => (
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

export default function Category() {
  return (
    <>
      <main>
        <h1>{categories[category_id].name}の作品一覧</h1>
        <CategoryImages category_id={category_id} />
      </main>
    </>
  );
}
