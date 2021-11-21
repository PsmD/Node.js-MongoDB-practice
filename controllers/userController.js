import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const {name, username, id, password, password2, email, location} = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: '비밀번호 확인란이 일치하지 않습니다.',
    });
  };
  
  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: '입력하신 닉네임은 이미 사용 중 입니다.',
    });
  };
  const idExists = await User.exists({ id });
  if (idExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: '입력하신 아이디는 이미 사용 중 입니다.',
    });
  };
    await User.create({
      name, username, id, password, password2, email, location
    });
  return res.redirect("/login");
};
export const cart = (req, res) => res.render('cart');
export const cs = (req, res) => res.render('cs');
export const login = (req, res) => res.render('login');
export const mypage = (req, res) => res.render('mypage');
export const track = (req, res) => res.render('track');
export const viewed = (req, res) => res.render('viewed');
export const home = (req, res) => res.render('home');
