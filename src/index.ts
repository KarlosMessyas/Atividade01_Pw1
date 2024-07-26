import { log } from 'console';
import { userRouter } from './routes/userRouters';
import express from 'express'
import technologiesRouter from './routes/technologieRouters';
const app = express();
app.use(express.json());
const port = 8080;

app.use("/user", userRouter);
app.use("/user/technologies", technologiesRouter);

app.listen(port, ()=>{
    console.table({
        status: "working",
        url: `http://localhost:${port}`
    })
});