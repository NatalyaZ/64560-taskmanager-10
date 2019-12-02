const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`
];

const generateFilters = () => {
  return filterNames.map((f) => {
    return {
      name: f,
      count: Math.floor(Math.random() * 10)
    };
  });
};

export {generateFilters};
