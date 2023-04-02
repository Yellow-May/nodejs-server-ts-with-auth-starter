import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
const connect = async () => await mongoose.connect(MONGO_URI ?? '');

export default connect;
