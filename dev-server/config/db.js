import mongoose from 'mongoose';

export function connectToDB(){
  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true},
  error => {
    if(error){
      console.log('Unable to connect to database');
      throw error; // Because we can't do anything without db
    }
    else{
      console.log('Connected to MongoDB!');
    }
  });
}
