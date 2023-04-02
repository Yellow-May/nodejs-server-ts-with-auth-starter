/* eslint-disable @typescript-eslint/no-misused-promises */
import { ScriptsModel } from '../models';
import scriptOne from './updates/01';

const scripts = [scriptOne];

const DBUpdates = async () => {
	try {
		scripts.forEach((script, idx) => {
			setTimeout(async () => {
				const created = await ScriptsModel.findOne({ id: script.scriptId });
				if (created === null) {
					await script.func();
					await ScriptsModel.create({ id: script.scriptId });
				}
			}, 1000 * idx);
		});
	} catch (error) {
		console.log('DB updates error', { error });
	}
};

export default DBUpdates;
