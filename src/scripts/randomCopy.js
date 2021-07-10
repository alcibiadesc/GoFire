const copys = [
	"Que la fuerza te acompañe",
	"Que tengas un buen día",
	"Hoy será un buen día",
	"Que alegría verte de nuevo",
];

export const randomCopy = () => {
	return copys[Math.floor(Math.random() * copys.length)];
};
