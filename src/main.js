import { renderHeaderMenuTemplate } from './components/menu';
import { renderFiltersTemplate } from './components/filters';
import { renderBoardTemplate } from './components/board';
import { renderTaskTemplate } from './components/task';
import { renderAddEditTaskTemplate } from './components/add-edit-task';
import { renderLoadMoreButtonTemplate } from './components/load-more-button';
import { generateFilters } from './mock/filter';
import { generateTasks } from './mock/task';


const TASK_COUNT = 22;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, renderHeaderMenuTemplate(), `beforeend`);

const filters = generateFilters();
render(siteMainElement, renderFiltersTemplate(filters), `beforeend`);
render(siteMainElement, renderBoardTemplate(), `beforeend`);

const siteBoardElement = siteMainElement.querySelector(`.board`);

const tasks = generateTasks(TASK_COUNT);
const taskListTemplate = siteBoardElement.querySelector(`.board__tasks`);
render(taskListTemplate, renderAddEditTaskTemplate(tasks[0]), `beforeend`);
tasks.slice(1).forEach((task) => render(taskListTemplate, renderTaskTemplate(task), `beforeend`));

render(siteBoardElement, renderLoadMoreButtonTemplate(), `beforeend`);
