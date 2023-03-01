import {db} from "../db.js";
import bcrypt from 'bcrypt';
import {uuid, v4} from 'uuid';

export async function singIn(req,res){
    const {email, password}=req.body;


    res.sendStatus(201);
}