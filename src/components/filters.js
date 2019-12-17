import {createElement} from '../utils';


const generateFilterMarkup = (filter, isChecked) => {
  const {title, count} = filter;

  const id = `filter__${title}`;
  const classCount = `filter__${title}-count`;

  const isDisabled = count === 0 ? `disabled` : ``;

  return (
    `<input
      type="radio"
      id="${id}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${isDisabled}
    />
    <label for="${id}" class="filter__label">
      ${title} <span class="${classCount}">${count}</span></label
    >`
  );
};

const renderFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((f, i) => generateFilterMarkup(f, i === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

export class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return renderFiltersTemplate(this._filters);
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
