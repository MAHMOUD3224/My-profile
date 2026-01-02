import dotenv from "dotenv"
import express, { type NextFunction, type Request, type Response } from "express"
import { router } from './routers/router.ts'
dotenv.config()

const app = express();

app.use(express.json());
app.use('/', router)

app.listen(process.env.PORT, ()=>{
	console.log("listening on port: " + process.env.PORT);
})