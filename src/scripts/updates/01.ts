import { AdminModel } from '../../models';

const scriptId = 1;

const data = {
	email: '',
	password: '',
	accessLevel: 10,
};

const createSuperAdmin = async () => {
	try {
		// await AdminModel.create(data);
		// console.log('Super Admin created');
	} catch (error) {
		console.log('create super admin error', { error });
	}
};

export default { scriptId, func: createSuperAdmin };
