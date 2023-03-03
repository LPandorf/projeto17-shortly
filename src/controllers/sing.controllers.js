import {connection} from "../db.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

export async function singIn(req,res){
    const {email, password}=req.body;

    const {rows:users}= await connection.query(
        `SELECT * FROM users WHERE email=$1`,
        [email]
    );

    const [user]=users;

    if(!user){
        return res.sendStatus(401)
    }

    if(bcrypt.compareSync(password,user.password)){
        const token=uuid();
        await connection.query(
            `INSERT INTO session (token,"userId") VALUES ($1,$2)`,
            [token, user.id]
        );
        return res.status(200).send("{ token: "+token+" }");
    }

    res.sendStatus(401);
}