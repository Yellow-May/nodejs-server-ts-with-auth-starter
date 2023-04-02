import './configs/dotenv';
import server from './server';
import DBconnect from './configs/db/connect';
import DBUpdates from './scripts';

const PORT = process.env.PORT;
const init = async () => {
	await DBconnect();
	await DBUpdates();
	server.listen(PORT, () => {
		console.log(`Server running on PORT: ${PORT ?? ''}`);
	});
};

init().catch((error) => {
	console.error(error);
	process.exit(1);
});
