const corsOptions = {
	origin: [
		process.env.ORIGIN_ONE ?? '',
		process.env.ORIGIN_TWO ?? '',
		process.env.ORIGIN_THREE ?? '',
		process.env.ORIGIN_FOUR ?? '',
		process.env.ORIGIN_FIVE ?? '',
		process.env.ORIGIN_SIX ?? '',
		process.env.ORIGIN_SEVEN ?? '',
		process.env.ORIGIN_EIGHT ?? '',
		process.env.ORIGIN_NINE ?? '',
		process.env.ORIGIN_TEN ?? '',
	],
	credentials: true,
	optionsSuccessStatus: 200,
};

export default corsOptions;
