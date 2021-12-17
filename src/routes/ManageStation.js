import { isValidName } from '../common/validation.js';
import Table from '../components/TableView.js';
import { SELECTORS } from '../constants/index.js';
import { setEvent } from '../eventbus/index.js';
import Component from '../interface/component.js';
import { getState, setState } from '../store/index.js';

export default class ManageStation extends Component {
    setup() {
        this.table = new Table('#table-view');
        this.selectors = SELECTORS.MANAGE_STATION;
        this.name = '';
    }

    mount() {
        this.stations = getState((state) => state.stations);

        this.delegateEvent();
        this.table.setConfig({
            columns: [
                { label: '역 이름', key: 'label' },
                {
                    label: '설정',
                    key: 'button',
                    onClick: this.onItemDelete.bind(this),
                    render: (rowData, idx) =>
                        `<button
                            class="${this.selectors.DELETE_BUTTON_CLASS}"
                            data-idx="${idx}"
                            data-event-id="${this.uid + this.selectors.DELETE_BUTTON_CLASS}">
                            삭제
                        </button>`,
                },
            ],
            data: this.stations,
        });

        this.table.render();
    }

    delegateEvent() {
        setEvent('change', this.uid + this.selectors.NAME_INPUT_ID, this.onChange.bind(this));
        setEvent('click', this.uid + this.selectors.ADD_BUTTON_ID, this.onClick.bind(this));
        setEvent('click', this.uid + this.selectors.DELETE_BUTTON_CLASS, this.onItemDelete.bind(this));
    }

    onChange(ev) {
        this.name = ev.target.value;
    }

    onClick(ev) {
        if (!isValidName(this.name)) return;

        const nextId = this.stations[this.stations.length - 1].id + 1;
        setState('stations', [...this.stations, { label: this.name, id: nextId }]);

        this.name = '';
    }

    onItemDelete({ target }) {
        const idx = Number(target.dataset.idx);

        setState(
            'stations',
            this.stations.filter((item, _idx) => idx !== _idx)
        );
    }

    template() {
        return `
            <h3>역 이름</h3>
            <input  type="text"
                    data-event-id="${this.uid + this.selectors.NAME_INPUT_ID}"
                    id="this.selectors.NAME_INPUT_ID"
                    value="${this.name}"
            />
            <input  type="button"
                    data-event-id="${this.uid + this.selectors.ADD_BUTTON_ID}"
                    id="${this.selectors.ADD_BUTTON_ID}"
                    value="역 추가"
            />
            <h1>🚄지하철 역 목록</h1>

            <div id="table-view"></div>
        `;
    }
}
