import { TitleManager } from '../app/HeaderBar/titleManager';

describe('title manager', () => {
    test('call all subscribers on title update', () => {
        const titleManager = new TitleManager();

        const mock = jest.fn();
        for (let i = 0; i < 5; i++) {
            titleManager.subscribe(mock);
        }

        titleManager.setTitle('any');

        expect(mock).toBeCalledTimes(5);
        expect(mock).toBeCalledWith('any');
    });
});