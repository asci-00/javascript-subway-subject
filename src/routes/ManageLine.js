import Table from '../components/TableView.js';
import Component from '../interface/component.js';

export default class ManageLine extends Component {
    setup() {
        this.table = new Table('#table-view');
    }

    mount() {
        this.stations = getState((state) => state.stations);

        this.table.setConfig({
            columns: [
                { label: '역 이름', key: 'name' },
                { label: '설정', key: 'config', onClick: (ev) => {} },
            ],
            data: this.stations,
        });

        this.table.render();
    }

    delegateEvent() {}

    tabClickEvent(idx) {}

    template() {
        return `
            <h3>역 이름</h3>
            <input type="text" data-event-id="" id="" value=""/>
            <input type="button" data-event-id="" id="" value="역 추가"/>
            <h1>🚄지하철 역 목록</h1>

            <div id="table-view"></div>
        `;
    }
}
