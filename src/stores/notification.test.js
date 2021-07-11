import {get} from 'svelte/store';
import {notification, resetNotification, template} from './notification.js';

describe('Store | Notification', () => {
  afterEach(() => resetNotification());
  test('should be the template', () => {
    const result = get(notification);
    const expected = template;
    expect(result).toEqual(expected);
  });

  test('reset storage', () => {
    notification.add('saving', {today: '2021-08-01', amount: 123});
    resetNotification();
    const result = get(notification);
    const expected = template;
    expect(result).toEqual(expected);
  });

  test('add a saving element', () => {
    const item = {today: '2021-08-01', amount: 345};
    notification.add('saving', item);
    const result = get(notification);
    const expected = expect.objectContaining({saving: [
      item,
    ]});
    expect(result).toEqual(expected);
  });


  test('add two saving element', () => {
    const itemOne = {today: '2021-08-01', amount: 345};
    const itemTwo = {today: '2021-08-02', amount: 678};
    notification.add('saving', itemOne);
    notification.add('saving', itemTwo);
    const result = get(notification);
    const expected = expect.objectContaining({saving: [
      itemOne,
      itemTwo,
    ]});
    expect(result).toEqual(expected);
  });

  test('add a status element', () => {
    const item = {today: '2021-09-01', amount: 120};
    notification.add('status', item);
    const result = get(notification);
    const expected = expect.objectContaining({status: [item]});
    expect(result).toEqual(expected);
  });
});
