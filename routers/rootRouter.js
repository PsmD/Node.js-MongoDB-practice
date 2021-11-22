import express from "express";
import { getJoin, postJoin, cart, cs ,getLogin, postLogin, mypage, track, viewed, home } from "../controllers/userController";
const rootRouter = express.Router();

rootRouter.get('/', home);

rootRouter.get('/mypage', mypage);

rootRouter.get('/viewed', viewed);

rootRouter.get('/cart', cart);

rootRouter.get('/track', track);

rootRouter.get('/cs', cs);

rootRouter.route("/join").get(getJoin).post(postJoin);

rootRouter.route("/login").get(getLogin).post(postLogin);

export default rootRouter;