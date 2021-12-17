export function customError(type, message) {
    this.type = type;
    this.message = message;
    this.toString = function () {
        return `${this.type}:${this.message}`;
    };
}
