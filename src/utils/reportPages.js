export const GENES_PER_REPORT_PAGE = 2;

export const getSections = (dnaCategories) => {
  const sections = dnaCategories?.data?.section ?? dnaCategories?.section;
  return Array.isArray(sections) ? sections : [];
};

export const getCollection = (section) =>
  Array.isArray(section?.collection) ? section.collection : [];

export const chunkItems = (items, size = GENES_PER_REPORT_PAGE) => {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

export const getSectionPageCount = (section) =>
  Math.max(1, Math.ceil(getCollection(section).length / GENES_PER_REPORT_PAGE));
