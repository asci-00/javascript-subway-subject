import { SELECTORS, TAB_ATTRS } from '../constants/index.js';
import { setEvent } from '../eventbus/index.js';
import Component from '../interface/component.js';
import { getState, setState } from '../store/index.js';
import ManageLine from './ManageLine.js';
import ManageSection from './ManageSection.js';
import ManageStation from './ManageStation.js';
import PrintMap from './PrintMap.js';

export default class App extends Component {
    setup() {
        this.route = {
            MANAGE_STATION: new ManageStation('#' + SELECTORS.MAIN_SECTION_ID),
            MANAGE_SECTION: new ManageSection('#' + SELECTORS.MAIN_SECTION_ID),
            MANAGE_LINE: new ManageLine('#' + SELECTORS.MAIN_SECTION_ID),
            PRINT_MAP: new PrintMap('#' + SELECTORS.MAIN_SECTION_ID),
        };
    }

    mount() {
        this.delegateEvent();

        this.routeStatus = getState((state) => state.routeStatus);

        this.route[this.routeStatus].render();
    }

    delegateEvent() {
        TAB_ATTRS.forEach((tab, idx) => {
            setEvent('click', this.uid + tab.id, (ev) => this.tabClickEvent(idx));
        });
    }

    tabClickEvent(idx) {
        const tabAttr = TAB_ATTRS[idx];

        if (this.routeStatus === tabAttr.key) return;

        setState('routeStatus', tabAttr.key);
    }

    tabListTemplate() {
        return TAB_ATTRS.map(
            (tab) => `
            <button id="${tab.id}" data-event-id="${this.uid + tab.id}">
                ${tab.label}
            </button>
        `
        ).join('');
    }

    template() {
        return `
            <header>${this.tabListTemplate()}</header>
            <section id="${SELECTORS.MAIN_SECTION_ID}"></section>
            <div></div>
        `;
    }
}
