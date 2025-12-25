import {Router, Request, Response} from "express";

const mainRouter = Router();

mainRouter.get("/", (req: Request, res: Response) => {
    return res.send("api is working");
});
export { mainRouter };