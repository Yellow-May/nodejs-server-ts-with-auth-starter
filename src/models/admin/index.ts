import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import type IAdminUser from './type';

const AdminSchema = new mongoose.Schema<IAdminUser>(
	{
		email: {
			type: String,
			trim: true,
			required: [true, 'Please provide an email'],
			validate: {
				validator: (val: string) => validator.isEmail(val),
				message: (props: { value: string }) =>
					`${props.value} is not a valid email`,
			},
			unique: true,
		},
		accessLevel: {
			type: Number,
			enum: {
				values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				message: '{VALUE} is not supported',
			},
			default: 0,
		},
		password: {
			type: String,
			required: [true, 'Please provide password'],
			minlength: 6,
		},
		passwordToken: String,
		passwordTokenExpirationDate: Date,
	},
	{ timestamps: true }
);

AdminSchema.pre('save', async function (next) {
	if (!this.isModified('password')) next();

	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(this.password, salt);
		this.password = hash;

		next();
	} catch (error: any) {
		next(error);
	}
});

AdminSchema.methods.comparePassword = async function (password: string) {
	const comparison = await bcrypt.compare(password, this.password);
	return comparison ?? false;
};

const AdminModel = mongoose.model<IAdminUser>('admin-users', AdminSchema);

export default AdminModel;
