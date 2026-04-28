import 'dotenv/config';
import mongoose from 'mongoose';


const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "DineFlow"
        })
        console.log("Connected to MongoDb");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
    }
}
export default connectDb;