export const $ = (target) => document.querySelector(target);
export const $all = (target) => document.querySelectorAll(target);
export const $getUID = (function () {
    let id = 0;
    return function () {
        return id++;
    };
})();
