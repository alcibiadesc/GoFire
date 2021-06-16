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
