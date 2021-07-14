/* eslint-disable camelcase */
import {get} from 'svelte/store';
import {data, resetData} from './data.js';

const generateData = (iterations = 100) => {
  const randomNumber = (n) => Math.floor(Math.random() * n);
  const randomAmount = (n) => Math.random() * n;

  const randomDate = () =>
    new Date(+new Date() - Math.floor(Math.random() * 10000000000))
        .toISOString()
        .substr(0, 10);

  let index = 0;
  let id = '';

  const loop = randomNumber(iterations) + 1;
  const stepReturn = randomNumber(loop);

  let revenueArray = [];
  let balanceArray = [];

  for (let step = 0; step < loop; step++) {
    data.add();
    const id_inside = get(data)[step].id;
    const numberAmount = randomAmount(100_000_000) + 0.01;

    data.change(id_inside, 'number', numberAmount);

    balanceArray = [...balanceArray, numberAmount];

    if (step === stepReturn) {
      index = step;
      id = id_inside;
    } else if (step > stepReturn) {
      const savingAmount = randomAmount(100_000_000) + 0.01;

      data.saving(id_inside, randomDate, savingAmount);
      revenueArray = [...revenueArray, savingAmount];
    }
  }

  return {id, index, revenueArray, balanceArray};
};

describe('Generate Data', () => {
  test('Generate more than 1 array item', () => {
    generateData();
    const result = get(data).length;

    expect(result).toBeGreaterThan(1);
  });
});

describe('data store', () => {
  beforeEach(() => resetData());

  test('store is an array empty', () => {
    const result = get(data);
    const expected = [];
    expect(result).toEqual(expected);
  });

  test('reset all data', () => {
    generateData();
    resetData();
    const result = get(data);
    const expected = [];
    expect(result).toEqual(expected);
  });

  test('add an item', () => {
    data.add('Title');
    const result = get(data);
    const expected = [
      {
        title: 'Title',
        number: 0,
        hightlight: false,
        saving: [],
        id: expect.any(String),
      },
    ];

    expect(result).toEqual(expected);
  });

  test('delete an item', ({id, index} = generateData()) => {
    expect(id).toEqual(expect.any(String));
    data.remove(id);
    const result = get(data).find((value) => value.id === id);

    expect(result).toBeUndefined();
  });

  test('change a value', ({id, index} = generateData()) => {
    data.change(id, 'title', 'Esparrago');
    const result = get(data)[index];
    const expected = {title: 'Esparrago'};

    expect(result).toEqual(expect.objectContaining(expected));
  });

  test('add a saving', ({id, index} = generateData()) => {
    data.saving(id, '2021-12-05', 40);

    const result = get(data)[index].saving;
    const expected = [
      {
        id_saving: expect.any(String),
        today: '2021-12-05',
        amount: 40,
      },
    ];

    expect(result).toEqual(expect.arrayContaining(expected));
  });

  test('delete a saving', ({id, index} = generateData()) => {
    data.saving(id, '2021-12-05', 220);
    const id_saving = get(data)[index].saving[0].id_saving;
    data.removeSaving(id, id_saving);

    const result = get(data)[index].saving;
    const expected = [];
    expect(result).toEqual(expected);
  });
  test('calculate reveanue', ({id, index, revenueArray} = generateData()) => {
    const result = data.revenue();
    const expected = revenueArray.reduce((a, b) => a + b, 0);

    expect(result).toBe(expected);
    expected;
  });

  test('calculate balance', ({balanceArray} = generateData()) => {
    const result = data.balance();
    const expected = balanceArray.reduce((a, b) => a + b, 0);

    expect(result).toBe(expected);
  });

  test('detect no savings', () => {
    for (let step = 0; step < 9; step++) {
      data.add();
      const id = get(data)[step].id;
      data.change(id, 'number', step);

      if (step > 4) {
        data.saving(id, '2009-08-28', 5);
      }
    }

    const result = data.detectNoSavings();
    const expected = 10;

    expect(result).toBe(expected);
  });

  test('move down an array item', ({id, index} = generateData()) => {
    let result = 0;
    const expected = index < get(data).length -1 ? index + 1 : index;
    data.moveDown(index);

    get(data).map((value, index) => {
      if (value.id === id) {
        result = index;
      }
    });
    expect(result).toEqual(expected);
  });

  test('move up an array item', ({id, index} = generateData()) => {
    let result = 0;
    const expected = index > 0 ? index - 1 : index;
    data.moveUp(index);

    get(data).map((value, index) => {
      if (value.id === id) {
        result = index;
      }
    });
    expect(result).toEqual(expected);
  });
});
