import {writable} from 'svelte/store';

const goal = writable();

const resetGoal = () => goal.set();

export {goal, resetGoal};
