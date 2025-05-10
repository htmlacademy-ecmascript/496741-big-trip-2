import AbstractView from '../framework/view/abstract-view.js';
import { ErrorText } from '../const.js';

function createFailedLoadTemplate() {
  return `<p class="trip-events__msg">${ErrorText.NO_SERVER}</p>`;
}

export default class FailedLoadView extends AbstractView {
  get template() {
    return createFailedLoadTemplate();
  }
}
