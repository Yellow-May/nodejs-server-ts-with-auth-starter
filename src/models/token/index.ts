import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema(
	{
		refreshToken: {
			type: String,
			required: true,
		},
		browserId: {
			type: String,
			required: true,
		},
		userAgent: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
);

const TokenModel = mongoose.model('session-tokens', TokenSchema);

export default TokenModel;
