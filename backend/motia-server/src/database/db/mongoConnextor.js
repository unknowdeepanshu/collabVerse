import mongoose from "mongoose";

// const DEFAULT_URI = "mongodb://127.0.0.1:27017/motia-app";

export async function connectMongo(logger) {
	const uri = process.env.MONGO_URL || DEFAULT_URI;

	if (mongoose.connection.readyState !== 0) {
		logger?.info?.("MongoDB connection ready");
		return mongoose;
	}

	try {
		await mongoose.connect(uri);
		logger?.info?.("MongoDB connected: " + uri);
		return mongoose;
	} catch (err) {
		logger?.error?.("MongoDB connection error: " + err);
		throw err;
	}
}