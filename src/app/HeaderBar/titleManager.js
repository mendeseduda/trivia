export class TitleManager {
    constructor() {
        this.subscribers = [];
    }

    setTitle(title) {
        this.subscribers.forEach(fn => fn(title));
    }

    subscribe(callback) {
        const length = this.subscribers.push(callback);
        return () => {
            this.subscribers.splice(length - 1, 1);
        };
    }
}