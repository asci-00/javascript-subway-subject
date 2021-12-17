import { $ } from './common/index.js';
import { defaultStatus } from './constants/index.js';
import { addEventType, watch } from './eventbus/index.js';
import App from './routes/App.js';
import { createStore, subscribe } from './store/index.js';

(function Subway() {
    const rootTarget = $('#app');

    createStore(defaultStatus);

    const rootComponent = new App('#app');

    subscribe(() => rootComponent.render());

    watch(rootTarget);
    addEventType('click');
    addEventType('change');

    rootComponent.render();
})();
