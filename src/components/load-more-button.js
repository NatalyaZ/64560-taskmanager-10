import {createElement} from '../utils';


const renderLoadMoreButtonTemplate = () => (
  `<button class="load-more" type="button">load more</button>`
);

export class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return renderLoadMoreButtonTemplate();
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
