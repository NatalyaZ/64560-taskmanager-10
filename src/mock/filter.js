import {filterTitles} from '../const';

const generateFilters = () => {
  return filterTitles.map((f) => {
    return {
      title: f,
      count: Math.floor(Math.random() * 10)
    };
  });
};

export {generateFilters};
