export const format = (num) => {
	return new Intl.NumberFormat("es", {
		notation: "compact",
		style: "currency",
		currency: "EUR",
	}).format(num);
};
