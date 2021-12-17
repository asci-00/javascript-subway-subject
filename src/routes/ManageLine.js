import { isValidName } from '../common/validation.js';
import Table from '../components/TableView.js';
import { SELECTORS } from '../constants/index.js';
import { setEvent } from '../eventbus/index.js';
import Component from '../interface/component.js';
import { getState, setState } from '../store/index.js';

export default class ManageLine extends Component {
    setup() {
        this.table = new Table('#table-view');
        this.selectors = SELECTORS.MANAGE_LINE;
    }

    willmount() {
        this.stations = getState((state) => state.stations);
        this.lines = getState((state) => state.lines);
    }

    mount() {
        this.table.setConfig({
            columns: [
                { label: '노선 이름', key: 'name' },
                {
                    label: '상행 종점역',
                    key: 'start',
                    render: (rowData) => rowData.path[0],
                },
                {
                    label: '하행 종점역',
                    key: 'end',
                    render: (rowData) => rowData.path[rowData.path.length - 1],
                },
                {
                    label: '설정',
                    key: 'button',
                    render: (rowData, idx) =>
                        `<button
                            class="${this.selectors.DELETE_BUTTON_CLASS}"
                            data-idx="${idx}"
                            data-event-id="${this.uid + this.selectors.DELETE_BUTTON_CLASS}">
                            삭제
                        </button>`,
                },
            ],
            data: this.lines,
        });

        this.table.render();
        this.delegateEvent();
    }

    delegateEvent() {
        setEvent('submit', this.uid + this.selectors.FORM_ID, this.onSubmit.bind(this));
        setEvent('click', this.uid + this.selectors.DELETE_BUTTON_CLASS, this.onItemDelete.bind(this));
    }

    onSubmit(ev) {
        ev.preventDefault();

        const { name, start, end } = ev.target;

        if (!isValidName(name.value)) return;

        setState('lines', [
            ...this.lines,
            {
                name: name.value,
                path: [start.value, end.value],
            },
        ]);
    }

    onItemDelete({ target }) {
        const idx = Number(target.dataset.idx);

        setState(
            'lines',
            this.lines.filter((item, _idx) => idx !== _idx)
        );
    }

    optionsTemplate() {
        return this.stations.map((station) => `<option value="${station}">${station}</option>`).join('');
    }

    template() {
        return `
            <h3>노선 이름</h3>
            <form data-event-id="${this.uid + this.selectors.FORM_ID}" id="${this.selectors.FORM_ID}">
                <input type="text" id="${this.selectors.NAME_INPUT_ID}" name="name"/>
                <select id="${this.selectors.START_STATION_ID}" name="start">
                    ${this.optionsTemplate()}
                </select>
                <select id="${this.selectors.END_STATION_ID}" name="end">
                    ${this.optionsTemplate()}
                </select>
                <input type="submit" id="${this.selectors.ADD_BUTTON_ID}" value="노선 추가"/>
            </form>
            <h1>🚄지하철 노선 목록</h1>

            <div id="table-view"></div>
        `;
    }
}
