import { IRouter, Router } from "express";
import { deleteDoc, getDoc, setDoc, updateDoc } from "../controllers";
import { authorizeHandler } from "../middlewares/authorizeHandler";

const routers: IRouter = Router();

routers.route('/document').get(authorizeHandler, getDoc).post(authorizeHandler, setDoc);
routers.route('/document/:id').delete(authorizeHandler, deleteDoc).put(authorizeHandler, updateDoc);

export default routers;