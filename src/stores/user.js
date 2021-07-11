import {writable} from 'svelte/store';

const template = {
  displayName: '',
  photoURL: 'icons/user.svg',
  email: '',
  uid: '',
};

const user = writable(template);

const resetUser = () => user.set(template);

export {user, resetUser};
