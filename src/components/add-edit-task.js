import {DAYS, COLORS, MONTH_NAMES} from '../const';
import {formatTime, createElement} from '../utils';


const createRepeatingDayMarkup = (day, isRepeat) => {
  return (
    `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}-4"
      name="repeat"
      value="${day}"
      ${isRepeat ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day}-4"
      >${day}</label
    >`
  );
};

const createRepeatingDaysMarkup = (days, repeatingDays) => {
  const list = days
    .map((day) => {
      return createRepeatingDayMarkup(day, repeatingDays[day]);
    })
    .join(`\n`);
  return (
    `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${list}
      </div>
    </fieldset>`
  );
};

const createHashtagMarkup = (tag) => {
  return (
    `<span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="${tag}"
        class="card__hashtag-hidden-input"
      />
      <p class="card__hashtag-name">
        #${tag}
      </p>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`
  );
};

const createHashtagsMarkup = (tags) => {
  const list = Array.from(tags).map(createHashtagMarkup).join(`\n`);
  return (
    `<div class="card__hashtag-list">
      ${list}
    </div>`
  );
};

const createColorMarkup = (color) => {
  return (
    `<input
      type="radio"
      id="color-${color}-4"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
    />
    <label
      for="color-${color}-4"
      class="card__color card__color--${color}"
      >${color}</label
    >`
  );
};

const createColorsMarkup = (colors) => {
  const list = colors.map(createColorMarkup).join(`\n`);
  return (
    `<div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
        ${list}
      </div>
    </div>`
  );
};

const renderAddEditTaskTemplate = (task) => {
  const {dueDate, description, repeatingDays, tags, color} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const repeatingDaysMarkup = createRepeatingDaysMarkup(DAYS, repeatingDays);
  const hashtagsMarkup = createHashtagsMarkup(tags);
  const colorsMarkup = createColorsMarkup(COLORS);

  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
  
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>
  
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                </button>

                ${isDateShowing ?
      `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${date} ${time}"
          />
        </label>
      </fieldset>`
      : ``}

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                </button>
  
                ${isRepeatingTask ? repeatingDaysMarkup : ``}
              </div>
  
              <div class="card__hashtag">
                ${hashtagsMarkup}
  
                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>
  
            ${colorsMarkup}
          </div>
  
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export class TaskEdit {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return renderAddEditTaskTemplate(this._task);
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
