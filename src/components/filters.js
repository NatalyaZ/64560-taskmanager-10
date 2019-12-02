
const generateFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  const id = `filter__${name}`;
  const classCount = `filter__${name}-count`

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
      ${name} <span class="${classCount}">${count}</span></label
    >`
  );
}

export const renderFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((f, i) => generateFilterMarkup(f, i === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};
