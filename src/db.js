import pg from 'pg';
import dotenv from "dotenv";

dotenv.config();

const {Pool}= pg;

const configDB={
    connectionString: process.env.DATABASE_URL,
};

if(process.env.MODE==="prod"){
    configDB.ssl=true;
}

export const connection = new Pool(configDB);