import {connection} from "../db.js";

export async function singValidation(req,res,next){
    const authorization= req.headers.authorization;
    const token= authorization?.replace("Bearer ","");
    
    if(!token){
        return res.status(401).send("sem token");
    }
    
    try{
        const {rows:session}= await connection.query(
            "SELECT * FROM session WHERE token=$1",
            [token]
        );
        
        const [sessionForNow]= session;
        
        if(!sessionForNow){
            return res.status(401).send("não foi possível identificar a sessão");
        }
        
        const {rows:user}= await connection.query(
            "SELECT * FROM users WHERE id=$1",
            [sessionForNow.userId]
        );
        
        const [userForNow]= user;

        if(!userForNow){
            return res.status(401).send("não foi possível identificar o usuário");
        }
        
        res.locals.user=userForNow;
        next();
    }catch(err){
        return res.status(500).send(err.message);
    }
}