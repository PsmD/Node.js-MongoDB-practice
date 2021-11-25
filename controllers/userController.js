import User from "../models/User";
import bcrypt from "bcrypt";

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
      name, username, id, password, email, location
    });
  return res.redirect("/login");
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { id, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ id });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "입력하신 아이디가 존재하지 않습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "잘못된 비밀번호입니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const getmypage = (req, res) => {
  return res.render("my-page", { pageTitle: "My Page" });
};
export const postmypage = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { name, username, id, password, email, location },
  } = req;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      username,
      id,
      password,
      email,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/");
};
export const getChangePassword = (req, res) => {
  return res.render("change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errorMessage: "기존 비밀번호가 일치하지 않습니다.",
    });
  }
  if (newPassword !== newPassword2) {
    return res.status(400).render("change-password", {
      pageTitle: "Change Password",
      errorMessage: "비밀번호 확인란이 일치하지 않습니다.",
    });
  }
  user.password = newPassword;
  await user.save();
  return res.redirect("logout");
};


export const cart = (req, res) => res.render('cart');
export const cs = (req, res) => res.render('cs');
export const mypage = (req, res) => res.render('my-page');
export const track = (req, res) => res.render('track');
export const viewed = (req, res) => res.render('viewed');
export const home = (req, res) => res.render('home');
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
