function formatWorksWithNavigation(works) {
  try {
    if (!Array.isArray(works)) {
      throw new Error("works not array");
    }

    const formattedResults = works.map((work, index) => {
      let previousWorkId = null;
      let nextWorkId = null;

      if (index > 0) {
        previousWorkId = works[index - 1].id;
      };
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
  } catch (err) {
    console.error("Error in workListItems.js:", err.message);
    throw err;
  };
};

export { formatWorksWithNavigation };