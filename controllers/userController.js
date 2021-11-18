import User from "../models/User";

export const getJoin = (req, res) => res.render("join.ejs", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const {email, password} = req.body;
  await User.create({
    email,
    password
  },);
  return res.redirect("/login");
};
export const cart = (req, res) => res.render('cart.ejs');
export const cs = (req, res) => res.render('cs.ejs');
export const login = (req, res) => res.render('login.ejs');
export const mypage = (req, res) => res.render('mypage.ejs');
export const track = (req, res) => res.render('track.ejs');
export const viewed = (req, res) => res.render('viewed.ejs');
export const home = (req, res) => res.render('home.ejs');
