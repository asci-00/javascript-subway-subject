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
            data: this.stations.map((station) => ({ label: station })),
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

        const { value } = ev.target.label;

        if (!isValidName(value)) return;

        setState('stations', [...this.stations, value]);
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
            <form data-event-id="${this.uid + this.selectors.FORM_ID}" id="${this.selectors.FORM_ID}">
                <input type="text" id="${this.selectors.NAME_INPUT_ID}" name="label"/>
                <input  type="submit"
                        id="${this.selectors.ADD_BUTTON_ID}"
                        value="역 추가"
                />
            </form>
            <h1>🚄지하철 역 목록</h1>
            <div id="table-view"></div>
        `;
    }
}
