import mongoose from 'mongoose';

// export default mongoose.connect(process.env.MONGODB_URL, {
const db = mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, (err, result)=>{
        if(err){
            return console.log(err);
        }
        console.log(result + 'database connection successful');
    }
);


export default db;
