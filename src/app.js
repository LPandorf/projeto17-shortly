import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import singRoutes from "./routes/sing.routes.js";
import urlRoutes from "./routes/url.routes.js";

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

app.use(singRoutes);
app.use(urlRoutes);

const port=process.env.PORT;
app.listen(port, ()=>console.log(`listening on ${port}`));