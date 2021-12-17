import { $, $getUID } from '../common/index.js';

export default class Component {
    constructor(target, props) {
        this.target = target;
        this.props = props;
        this.state = null;

        this.uid = $getUID();

        this.setup();
    }

    setup() {}

    mount() {}

    template() {}

    render() {
        $(this.target).innerHTML = this.template();
        this.mount();
    }
}
