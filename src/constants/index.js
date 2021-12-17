export const TAB_ATTRS = Object.freeze([
    {
        label: '1. 역 관리',
        id: 'station-manager-button',
        key: 'MANAGE_STATION',
    },
    {
        label: '2. 노선 관리',
        id: 'line-manager-button',
        key: 'MANAGE_LINE',
    },
    {
        label: '3. 구간 관리',
        id: 'section-manager-button',
        key: 'MANAGE_SECTION',
    },
    {
        label: '2. 지하철 노선도 출력',
        id: 'map-print-manager-button',
        key: 'PRINT_MAP',
    },
]);

export const SELECTORS = Object.freeze({
    MAIN_SECTION_ID: 'main-section',
    MANAGE_STATION: {
        FORM_ID: 'station-form',
        NAME_INPUT_ID: 'station-name-input',
        ADD_BUTTON_ID: 'station-add-button',
        DELETE_BUTTON_CLASS: 'station-delete-button',
    },
    MANAGE_LINE: {
        FORM_ID: 'line-form',
        NAME_INPUT_ID: 'line-name-input',
        START_STATION_ID: 'line-start-station-selector',
        END_STATION_ID: 'line-end-station-selector',
        ADD_BUTTON_ID: 'line-add-button',
        DELETE_BUTTON_CLASS: 'line-delete-button',
    },
    MANAGE_SECTION: {
        FORM_ID: 'section-form',
        LINE_MENU_BUTTON_CLASS: 'section-line-menu-button',
        SELECTOR: 'section-station-selector',
        ORDER_INPUT_ID: 'section-order-input',
        ADD_BUTTON_ID: 'section-add-button',
        DELETE_BUTTON_CLASS: 'section-delete-button',
    },
    PRINT_MAP: {
        TARGET_CLASS: 'map',
    },
});

export const defaultStatus = Object.freeze({
    routeStatus: 'MANAGE_STATION',
    stations: ['수원역'], // { label: string, id: number } [ ]
    lines: [], // { name: string, start: number(id), end: number(id), path: number [ ] }
});
