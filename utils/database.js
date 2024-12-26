import mongoose from 'mongoose';

let isConnected = false;


export const connectToDB = async () => {
    mongoose.set('strictQuery', true);      //setting as we get warmings in consoles.
    mongoose.set('debug', true);
    
    if(isConnected){
        console.log('MongoDB is already connected');
        return;    //to stop it from running 
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt", 
            
          })
      
        isConnected = true;
        console.log('MongoDB connected')
    } 
    catch (error) {
        
            console.error('Connection error while connecting to MongoDB:', error.message);
            console.error('Error code:', error.codeName || error.code);
            console.error('Error stack:', error.stack);
              
    }
}
