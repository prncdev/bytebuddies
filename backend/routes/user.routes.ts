import { IRouter, Router } from "express";
import { deleteUser, getMe, getUser, getUsers, loginV2, logout, register, updateUser } from "../controllers";
import { authorizeHandler } from "../middlewares/authorizeHandler";

const routers: IRouter = Router();

// routers.get('/', getUsers);
routers.get('/me', authorizeHandler, getMe);
routers.post('/register', register);
routers.post('/login', loginV2);
routers.delete('/logout', logout);

// routers.route('/:id').get(getUser).put(updateUser).delete(deleteUser);


// export default routers;
export = routers;