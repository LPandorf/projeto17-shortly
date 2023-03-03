import {connection} from "../db.js";
import bcrypt from 'bcrypt';

export async function singUp(req, res){
    const {email,name,password}=req.body;
    
    try{
        console.log("4");
        const exist= await connection.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );
        
        if(exist.rowCount>0){
            return res.sendStatus(409);
        }
        
        const hashedPassword=bcrypt.hashSync(password,12);
        
        await connection.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
            [name,email,hashedPassword]
        );
        console.log("8");
        res.sendStatus(201);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function userById(req,res){
    const {user}=res.locals;

    try{

    }catch(err){
        return res.status(500).send(err.message);
    }

}
