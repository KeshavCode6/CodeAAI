import mongoose, { Connection } from "mongoose";

const { MONGO_DB_URI } = process.env;

interface ConnectionStatus {
    isConnected?: number;
}

const connection: ConnectionStatus = {};

async function dbConnect(): Promise<void> {

    if (connection.isConnected) {
        return;
    }

    if (!MONGO_DB_URI) {
        throw new Error("MONGO_DB_URI is not defined");
    }

    const db = await mongoose.connect(MONGO_DB_URI);
    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;