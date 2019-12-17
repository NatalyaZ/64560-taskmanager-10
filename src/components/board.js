import {BOARD_FILTERS} from '../const';
import {createElement} from '../utils';


const createBoardFilterMarkup = (filter) => (
  `<a href="#" class="board__filter">${filter}</a>`
);

const createBoardFiltersMarkup = (filters) => (
  `<div class="board__filter-list">
    ${filters.map(createBoardFilterMarkup).join(`\n`)}
  </div>`
);

const renderBoardTemplate = (filters) => {
  const boardFiltersMarkup = createBoardFiltersMarkup(filters);

  return (
    `<section class="board container">
      ${boardFiltersMarkup}
      <div class="board__tasks"></div>
    </section>`
  );
};

export class Board {
  constructor() {
    this._filters = BOARD_FILTERS;
    this._element = null;
  }

  getTemplate() {
    return renderBoardTemplate(this._filters);
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
