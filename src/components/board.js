import {BOARD_FILTERS} from '../const';

const createBoardFilterMarkup = (filter) => (
  `<a href="#" class="board__filter">${filter}</a>`
);

const createBoardFiltersMarkup = (filters) => {
  return (
    `<div class="board__filter-list">
      ${filters.map(createBoardFilterMarkup).join(`\n`)}
    </div>`
  )
}

export const renderBoardTemplate = () => {
  const boardFiltersMarkup = createBoardFiltersMarkup(BOARD_FILTERS);

  return (
    `<section class="board container">
      ${boardFiltersMarkup}
      <div class="board__tasks"></div>
    </section>`
  )
};
