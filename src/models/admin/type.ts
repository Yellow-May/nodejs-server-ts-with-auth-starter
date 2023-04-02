import type { Document } from 'mongoose';

export default interface IAdminUser extends Document {
	email: string;
	password: string;
	accessLevel: number;
	passwordToken: string;
	passwordTokenExpirationDate: Date;
	comparePassword: (password: string) => Promise<boolean>;
	createdAt: Date;
	updatedAt: Date;
}
