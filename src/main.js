import {HeaderMenu} from './components/menu';
import {Filters} from './components/filters';
import {Board} from './components/board';
import {renderTaskTemplate} from './components/task';
import {renderAddEditTaskTemplate} from './components/add-edit-task';
import {renderLoadMoreButtonTemplate} from './components/load-more-button';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';
import {TASK_COUNT, RenderPosition} from './const';
import {render} from './utils';


const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new HeaderMenu().getElement());

const filters = generateFilters();
render(siteMainElement, new Filters(filters).getElement());
render(siteMainElement, new Board().getElement(), RenderPosition.AFTERBEGIN);

const siteBoardElement = siteMainElement.querySelector(`.board`);

const tasks = generateTasks(TASK_COUNT);
const taskListTemplate = siteBoardElement.querySelector(`.board__tasks`);
render(taskListTemplate, renderAddEditTaskTemplate(tasks[0]));
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskListTemplate, renderTaskTemplate(task)));

render(siteBoardElement, renderLoadMoreButtonTemplate());

const loadMoreButton = siteBoardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListTemplate, renderTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
