import mongoose from 'mongoose';

let isConnected = false;
import {MONGODB_URI} from '@/config.js'

export const connectToDB = async () => {
       mongoose.set('strictQuery', true);      //setting as we get warmings in consoles.

    if(isConnected){
        console.log('MongoDB is already connected');
        return;    //to stop it from running 
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
      
        isConnected = true;
      
        console.log('MongoDB connected')
    } 
    catch (error) {
        console.log(error);
    }
}
