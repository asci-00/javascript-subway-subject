import { isPositiveNumber, isValid } from '../common/validation.js';
import Table from '../components/TableView.js';
import { SELECTORS } from '../constants/index.js';
import { setEvent } from '../eventbus/index.js';
import Component from '../interface/component.js';
import { getState, setState } from '../store/index.js';

export default class ManageSection extends Component {
    setup() {
        this.selectedLine = null;
        this.selectors = SELECTORS.MANAGE_SECTION;
        this.table = new Table('#table-view');
    }

    willmount() {
        this.stations = getState((state) => state.stations);
        this.lines = getState((state) => state.lines);
    }

    mount() {
        this.table.setConfig({
            columns: [
                { label: '순서', key: 'sequence' },
                {
                    label: '이름',
                    key: 'station',
                    render: (rowData) => rowData.station,
                },
                {
                    label: '설정',
                    key: 'button',
                    render: (rowData, idx) =>
                        `<button
                            class="${this.selectors.DELETE_BUTTON_CLASS}"
                            data-idx="${idx}"
                            data-event-id="${this.uid + this.selectors.DELETE_BUTTON_CLASS}">
                            노선에서 삭제
                        </button>`,
                },
            ],
            data: this.selectedLine?.path.map((station, idx) => ({
                sequence: idx,
                station,
            })),
        });

        if (this.selectedLine) this.table.render();
        this.delegateEvent();
    }

    delegateEvent() {
        setEvent('click', this.uid + this.selectors.SELECTOR, this.onNavClick.bind(this));
        setEvent('click', this.uid + this.selectors.DELETE_BUTTON_CLASS, this.onItemDelete.bind(this));
        setEvent('submit', this.uid + this.selectors.FORM_ID, this.onItemInsert.bind(this));
    }

    onNavClick(ev) {
        const lineIdx = Number(ev.target.dataset.idx);
        this.selectedLine = this.lines[lineIdx];

        this.render();
    }

    onItemDelete(ev) {
        const { idx } = ev.target.dataset;

        console.log(idx, this.selectedLine);
        if (this.selectedLine.path.length <= 2) return;

        this.selectedLine.path = this.selectedLine.path.filter((path, _idx) => idx != _idx);

        setState('lines', this.lines);
    }

    onItemInsert(ev) {
        ev.preventDefault();

        const { station, sequence } = ev.target;

        if (!isValid(sequence.value) || !isPositiveNumber(sequence.value)) return;
        if (this.selectedLine.path.includes(station.value)) return;
        if (this.selectedLine.path.length < sequence.value) return;

        this.selectedLine.path.splice(sequence.value, 0, station.value);

        setState('lines', this.lines);
    }

    lineNavTemplate() {
        return this.lines
            .map(
                (line, idx) => `
                    <button
                        class="${this.selectors.SELECTOR}"
                        data-idx="${idx}"
                        data-event-id="${this.uid + this.selectors.SELECTOR}">
                        ${line.name}
                    </button>
                `
            )
            .join('');
    }

    optionsTemplate() {
        return this.stations.map((station) => `<option value="${station}">${station}</option>`).join('');
    }

    template() {
        return `
            <h3>구간을 수정할 노선을 선택해주세요.</h3>
            <nav>${this.lineNavTemplate()}</nav>
            ${
                this.selectedLine
                    ? `
                    <h2>${this.selectedLine.name} 관리</h2>
                    <h4>구간 등록</h4>
                    <form id="${this.selectors.FORM_ID}" data-event-id="${this.uid + this.selectors.FORM_ID}">
                        <select name="station">${this.optionsTemplate()}</select>
                        <input type="text" name="sequence"/>
                        <input type="submit" value="등록"/>
                    </form>
                    <div id="table-view"></div>
                `
                    : ''
            }
        `;
    }
}
