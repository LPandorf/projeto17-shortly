import {connection} from "../db.js";

export async function singValidation(req,res,next){
    const authorization= req.headers.authorization;
    const token= authorization?.replace("Bearer ","");
    console.log("0")
    if(!token){
        return res.status(401).send("sem token");
    }
    console.log("1")
    try{
        const {rows:session}= await connection.query(
            "SELECT * FROM session WHERE token=$1",
            [token]
        );
            console.log("2")
        const [sessionForNow]= session;
            console.log("3")
        if(!sessionForNow){
            return res.status(401).send("não foi possível identificar a sessão");
        }
        console.log("4")
        const {rows:user}= await connection.query(
            "SELECT * FROM users WHERE id=$1",
            [sessionForNow.userId]
        );
            console.log("5")
        const [userForNow]= user;

        if(!userForNow){
            return res.status(401).send("não foi possível identificar o usuário");
        }
        console.log("1")
        res.locals.user=userForNow;
        next();
    }catch(err){
        return res.status(500).send(err.message);
    }
}