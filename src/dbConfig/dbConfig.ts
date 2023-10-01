import mongoose from "mongoose";

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to Database!');
        });

        connection.on('error', err => {
            throw new Error(err);
        })
    } catch (error) {
        console.log('Failed to connect to Database');
        console.error((error as Error).message);
    }
}

export default connect;