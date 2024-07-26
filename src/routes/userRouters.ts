import express from 'express';
import { user } from '../model/userType';
import { v4 as uuid } from 'uuid';
import { log } from 'console';
import checkExistsUserAccount from '../middlewares/checkExistsUserAccount';

const userRouter = express.Router();

userRouter.post("/", checkExistsUserAccount ,(req, res) => {
    const { name, username } = req.body;
    const newUser = {
        id: uuid(),
        name,
        username,
        technologies:[]
    }
    user.push(newUser);
    res.status(201).json({
        client: newUser
    });
});

userRouter.get("/", (req, res) => {
    for(let i=0; i<=user.length; i++){
        res.send(user[i]);
    }
});

export { userRouter };

