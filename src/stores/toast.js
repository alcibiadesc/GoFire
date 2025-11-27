import { writable } from 'svelte/store';

function createToastStore() {
	const { subscribe, update } = writable([]);

	let id = 0;

	return {
		subscribe,
		add: (message, type = 'info', duration = 4000) => {
			const toastId = id++;
			update(toasts => [...toasts, { id: toastId, message, type, duration }]);
			return toastId;
		},
		success: (message, duration = 4000) => {
			const toastId = id++;
			update(toasts => [...toasts, { id: toastId, message, type: 'success', duration }]);
			return toastId;
		},
		error: (message, duration = 4000) => {
			const toastId = id++;
			update(toasts => [...toasts, { id: toastId, message, type: 'error', duration }]);
			return toastId;
		},
		warning: (message, duration = 4000) => {
			const toastId = id++;
			update(toasts => [...toasts, { id: toastId, message, type: 'warning', duration }]);
			return toastId;
		},
		info: (message, duration = 4000) => {
			const toastId = id++;
			update(toasts => [...toasts, { id: toastId, message, type: 'info', duration }]);
			return toastId;
		},
		dismiss: (toastId) => {
			update(toasts => toasts.filter(t => t.id !== toastId));
		},
		clear: () => {
			update(() => []);
		}
	};
}

export const toast = createToastStore();
