import express from 'express';
import { Request, Response,NextFunction } from 'express';
import { user } from '../model/userType';

const checkExistsUserAccount=(req:Request,res:Response,next:NextFunction)=>{
    const {username}=req.body;
    try {
        const index=user.findIndex(user=>user.username===username);
        if(index>-1){
            return res.status(404).json({error: "Usuário já existe"});
    }
    next();
    } catch (error) {
        console.error('Erro ao verificar a existência do usuário:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default checkExistsUserAccount;