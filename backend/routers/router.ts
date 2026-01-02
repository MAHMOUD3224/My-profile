import Router, { type Express, type NextFunction, type Request, type Response} from 'express'
import { type HttpResponse, userRequest } from "../utilities/utils.ts"
import fs from "node:fs/promises"
import path from 'path'
export const router: Express = Router()

const dataFileDir = path.join(import.meta.dirname, '../', 'data.json')

router.get("/api/v1/userData", async (req: Request, res: Response)=>{
	let userData = await fs.readFile(dataFileDir, 'utf-8');
	res.send(JSON.parse(userData));
})

router.post("/api/v1/userData", async (req: Request, res: Response)=>{
	try {
		userRequest.parse(req.body);
		let userData = await fs.readFile(dataFileDir, 'utf-8');
		let newUser = {...JSON.parse(userData), ...req.body};
		let newUserString = JSON.stringify(newUser, null , 2);
		await fs.writeFile(dataFileDir, newUserString);
		let response: HttpResponse = {status: 200, "message": "Success: Your data has been written", data: newUser};
		res.send(response);
	} catch (error) {
		let response: HttpResponse = {status: 400, "message": "Error: Bad Request Parameters, Make Sure Your Data Matches the Request Schema!", data: null};
		res.send(response);
	}
})

router.delete("/api/v1/userData", async (req: Request, res: Response)=>{
	try {
		let newUser = { "userName": "", "slogan": "", "shortSummary": "", "bio": [], "projectsDescription": "" }
		let newUserString = JSON.stringify(newUser, null , 2);
		await fs.writeFile(dataFileDir, newUserString);
		let response: HttpResponse = {status: 200, "message": "Success: Your data has been written", data: newUser};
		res.send(response);
	} catch (error) {
		let response: HttpResponse = {status: 400, "message": "", data: null};
		res.send(response);
	}
})