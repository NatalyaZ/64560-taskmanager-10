import {RenderPosition} from './const';
import {Task} from './components/task';
import {TaskEdit} from './components/add-edit-task';


const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
  }
};

export const renderTaskWithListeners = (parentElement, task) => {
  const editTaskCard = new TaskEdit(task);
  const taskCard = new Task(task);

  const editButton = taskCard.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    parentElement.replaceChild(editTaskCard.getElement(), taskCard.getElement());
  });

  const submitButton = editTaskCard.getElement().querySelector(`form`);
  submitButton.addEventListener(`click`, () => {
    parentElement.replaceChild(taskCard.getElement(), editTaskCard.getElement());
  });

  render(parentElement, taskCard.getElement());
};
