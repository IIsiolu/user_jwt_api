import express from 'express';
import userRouter from './routers/user_route';
import './db/db';
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(userRouter);



app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});
