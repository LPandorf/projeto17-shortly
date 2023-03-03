import { nanoid } from "nanoid";
import { connection } from "../db.js";

export async function short(req, res) {
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

export async function urlById(req, res){
    const {id} = req.params;

    try{
        const data= await connection.query(
            `SELECT * FROM shorts WHERE id=$1`,
            [id]
        );

        if(data.rowCount===0){
            return res.sendStatus(404)
        }

        const [url]=data.rows;

        const urlBody={
            id: url.id,
            shortUrl: url.shortUrl,
            url: url.url
        }

        res.send(urlBody);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function openNewUrl(req, res) {
    const {shortUrl}=req.params;

    try{
        const data = await connection.query(
            `SELECT * FROM shorts WHERE "shortUrl"=$1`,
            [shortUrl]
        );
            
        if(data.rowCount===0){
            return res.sendStatus(404);
        }

        const url = data.rows[0];

        await connection.query(
            `UPDATE shorts SET "views"="views"+1 WHERE id=$1`,
            [url.id]
        );

        res.redirect(url.url);
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function urlDelete(req, res) {
    const {id}=req.params;
    const {user}=res.locals;

    try{
        const data = await connection.query(
            `SELECT * FROM shorts WHERE id=$1`,
            [id]
        );

        if(data.rowCount===0){
            return res.sendStatus(404);
        }

        const [url]=data.rows;
        
        if(url.userId!==user.id){
            return res.sendStatus(401);
        }

        await connection.query(
            `DELETE FROM shorts WHERE id=$1`,
            [id]
        );

        res.sendStatus(204);
    }catch(err){
        return res.status(500).send(err.message)
    }
}