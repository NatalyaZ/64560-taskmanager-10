import { renderHeaderMenuTemplate } from './components/menu';
import { renderFiltersTemplate } from './components/filters';
import { renderBoardTemplate, renderBoardFilterTemplate } from './components/board';
import { renderTaskTemplate } from './components/task';
import { renderAddEditTaskTemplate } from './components/add-edit-task';
import { renderLoadMoreButtonTemplate } from './components/load-more-button';


const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template());
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, renderHeaderMenuTemplate, `beforeend`);
render(siteMainElement, renderFiltersTemplate, `beforeend`);
render(siteMainElement, renderBoardTemplate, `beforeend`);

const siteBoardElement = siteMainElement.querySelector(`.board`);
render(siteBoardElement, renderBoardFilterTemplate, `afterbegin`);

const taskListTemplate = siteBoardElement.querySelector(`.board__tasks`);
render(taskListTemplate, renderAddEditTaskTemplate, `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListTemplate, renderTaskTemplate, `beforeend`);
}

render(siteBoardElement, renderLoadMoreButtonTemplate, `beforeend`);
