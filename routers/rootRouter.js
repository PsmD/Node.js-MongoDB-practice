import express from "express";
import { getJoin, postJoin, cart, cs ,getLogin, logout, postLogin, getmypage, getChangePassword, postChangePassword, postmypage, track, viewed, home } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get('/', home);

rootRouter.route('/my-page').all(protectorMiddleware).get(getmypage).post(postmypage);

rootRouter.get('/viewed', viewed);

rootRouter.get('/cart', cart);

rootRouter.get('/track', track);

rootRouter.get('/cs', cs);

rootRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);

rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);

rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);

rootRouter.get("/logout", protectorMiddleware, logout);

export default rootRouter;