import express from "express";
import { getUpload, postUpload, getJoin, postJoin, cart, cs ,getLogin, logout, postLogin, getmypage, getChangePassword, postChangePassword, postmypage, track, viewed, home, watch } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, imageUpload } from "../middlewares";

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

rootRouter.get("/:id([0-9a-f]{24})", watch);

rootRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(imageUpload.single("image"), postUpload);

export default rootRouter;