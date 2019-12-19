import {HeaderMenu} from './components/menu';
import {Filters} from './components/filters';
import {Board} from './components/board';
import {Task} from './components/task';
import {TaskEdit} from './components/add-edit-task';
import {LoadMoreButton} from './components/load-more-button';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';
import {TASK_COUNT, SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON} from './const';
import {render} from './utils';


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new HeaderMenu().getElement());

const filters = generateFilters();
render(siteMainElement, new Filters(filters).getElement());
render(siteMainElement, new Board().getElement());

const siteBoardElement = siteMainElement.querySelector(`.board`);

const tasks = generateTasks(TASK_COUNT);

const taskListTemplate = siteBoardElement.querySelector(`.board__tasks`);
render(taskListTemplate, new TaskEdit(tasks[0]).getElement());

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskListTemplate, new Task(task).getElement()));

render(siteBoardElement, new LoadMoreButton().getElement());

const loadMoreButton = siteBoardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListTemplate, new Task(task).getElement()));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
