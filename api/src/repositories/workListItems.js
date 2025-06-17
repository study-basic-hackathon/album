function formatWorksWithNavigation(works) {
  const formattedResults = works.map((work, index) => {
    let previousWorkId = null;
    let nextWorkId = null;

    // 現在の作品が配列の最初の要素でなければ、前の作品のIDを取得
    if (index > 0) {
      previousWorkId = works[index - 1].id;
    };

    // 現在の作品が配列の最後の要素でなければ、次の作品のIDを取得
    if (index < works.length - 1) {
      nextWorkId = works[index + 1].id;
    };

    return {
      work: {
        id: work.id,
        title: work.title,
        arranger_id: work.arranger_id,
        material_ids: work.material_ids,
        season_id: work.season_id,
        category_id: work.category_id,
        image_urls: work.image_urls,
        created_at: work.created_at,
      },
      navigation: {
        previous: previousWorkId,
        next: nextWorkId,
      },
    };
  });

  return formattedResults;
};

export { formatWorksWithNavigation };