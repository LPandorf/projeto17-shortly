import { nanoid } from "nanoid";
import { connection } from "../db.js";

export async function short(req, res) {
    console.log("2")
    const {id}=res.locals.user;
    const {url}=req.body;

    const shortUrl=nanoid(8);

    try{
        await connection.query(
            `INSERT INTO shorts (url, "shortUrl", "userId") VALUES ($1,$2,$3)`,
            [url,shortUrl,id]
        );

        res.status(201).send({id, shortUrl});
    }catch(err){
        return res.status(500).send(err.message);
    }
}