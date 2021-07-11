import {writable} from 'svelte/store';


const template = {saving: [], status: []};

const createNotification = () =>{
  const {subscribe, set} = writable({...template});

  const getObj = (object = {}) => {
    subscribe((o) => object = o);
    return object;
  };


  const add = ((location, item, object = getObj()) => {
    object[location] = [...object[location], item];
    set(object);
  });


  return {
    add,
    subscribe,
    set,

  };
};

const notification = createNotification();


const resetNotification = () => notification.set({...template});

export {notification, resetNotification, template};

