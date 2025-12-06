import mongoose from 'mongoose';

type connectionobject = {
    isConnected?: number;    
}

const connection : connectionobject = {};

//databse connection function

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already Connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || '' , {});
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

export default dbConnect;