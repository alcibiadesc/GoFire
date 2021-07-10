import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

let template = {
  title: "Título",
  number: 0,
  hightlight: false,
  saving: [],
};

const createData = () => {
  const { subscribe, update, set } = writable([]);

  const getArray = (array = []) => {
    subscribe((n) => (array = n));
    return array;
  };

  const add = () => update((n) => [...n, { ...template, id: uuidv4() }]);
  const remove = (id) => update((n) => n.filter((ele) => ele.id !== id));

  const change = (id, key, value, array = getArray()) => {
    array.map((ele) => (ele.id === id ? (ele[key] = value) : ""));
    set(array);
  };

  const saving = (id, today, amount, array = getArray()) => {
    array.map((ele) =>
      ele.id === id
        ? (ele.saving = [...ele.saving, { id_saving: uuidv4(), today, amount }])
        : ""
    );
    set(array);
  };

  const revenue = (array = getArray(), arrayBalance = []) => {
    array.map((ele) =>
      ele.saving.map((m) => (arrayBalance = [...arrayBalance, m.amount]))
    );
    const result = arrayBalance.reduce((acc, crt) => acc + crt, 0);
    return result;
  };

  const balance = (array = getArray()) =>
    array.reduce((acc, crt) => acc + crt.number, 0);

  const detectNoSavings = (array = getArray(), arrayMerge = []) => {
    array.map((ele) =>
      ele.saving.length === 0 ? (arrayMerge = [...arrayMerge, ele.number]) : ""
    );

    let result = arrayMerge.reduce((acc, crt) => acc + crt, 0);
    return result;
  };

  const removeSaving = (id, id_saving, array = getArray()) => {
    const object = array.find((value) => value.id === id);
    let newArray = object.saving.filter((x) => x.id_saving !== id_saving);

    update((ele) =>
      ele.map((n) => (n.id === id ? { ...n, saving: newArray } : n))
    );
  };

  return {
    subscribe,
    update,
    set,
    add,
    remove,
    change,
    balance,
    saving,
    revenue,
    detectNoSavings,
    removeSaving,
  };
};

const data = createData();

const resetData = () => {
  data.set([]);
};

export { data, resetData };
