import express from "express";
import { getJoin, postJoin, cart, cs ,login, mypage, track, viewed, home } from "../controllers/userController";
const rootRouter = express.Router();

rootRouter.get('/', home);

rootRouter.get('/mypage', mypage);

rootRouter.get('/viewed', viewed);

rootRouter.get('/cart', cart);

rootRouter.get('/track', track);

rootRouter.get('/cs', cs);

rootRouter.route("/join").get(getJoin).post(postJoin);

rootRouter.get("/login", login);

export default rootRouter;