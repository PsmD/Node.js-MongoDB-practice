import express from "express";
import { getJoin, postJoin, cart, cs ,getLogin, logout, postLogin, mypage, track, viewed, home } from "../controllers/userController";
const rootRouter = express.Router();

rootRouter.get('/', home);

rootRouter.get('/my-page', mypage);

rootRouter.get('/viewed', viewed);

rootRouter.get('/cart', cart);

rootRouter.get('/track', track);

rootRouter.get('/cs', cs);

rootRouter.route("/join").get(getJoin).post(postJoin);

rootRouter.route("/login").get(getLogin).post(postLogin);

rootRouter.get("/logout", logout);

export default rootRouter;