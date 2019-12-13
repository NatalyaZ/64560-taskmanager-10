
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

export const renderFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((f, i) => generateFilterMarkup(f, i === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};
