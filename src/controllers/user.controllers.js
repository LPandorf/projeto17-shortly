import {db} from "../db.js";
import bcrypt from 'bcrypt';

export async function singUp(req, res){
    const {email,name,password}=req.body;

    try{
        const exist= await db.query(
            "SELECT *FROM users WHERE email=$1",
            [email]
        );

        if(exist.rowCount>0){
            return res.sendStatus(409);
        }

        const hashedPassword=bcrypt.hashSync(password,12);

        await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",
            [name,email,hashedPassword]
        );

        res.sendStatus(201);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

