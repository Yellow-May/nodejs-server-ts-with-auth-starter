import mongoose from 'mongoose';

const ScriptsSchema = new mongoose.Schema(
	{
		id: {
			type: Number,
			required: [true, 'script id is required'],
			unique: true,
		},
	},
	{ timestamps: true }
);

const ScriptsModel = mongoose.model('DB-scripts', ScriptsSchema);

export default ScriptsModel;
