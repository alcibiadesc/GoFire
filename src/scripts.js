export const format = (num) => {
	return new Intl.NumberFormat("es", {
		notation: "compact",
		style: "currency",
		currency: "EUR",
	}).format(num);
};

export const formatBasic = (num) => {
	return new Intl.NumberFormat("es", {
		style: "currency",
		currency: "EUR",
	}).format(num);
};

export const formatPercent = (num) => {
	return new Intl.NumberFormat("en", {
		style: "percent",
	}).format(num);
};

export const today = new Date().toISOString().slice(0, 10);
