import User from "../models/User";
import Image from "../models/Image";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const {name, username, id, password, password2, email, location} = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      errorMessage: '비밀번호 확인란이 일치하지 않습니다.',
    });
  };
  
  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.status(400).render("join", {
      errorMessage: '입력하신 닉네임은 이미 사용 중 입니다.',
    });
  };
  const idExists = await User.exists({ id });
  if (idExists) {
    return res.status(400).render("join", {
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
  const user = await User.findOne({ id });
  if (!user) {
    return res.status(400).render("login", {
      errorMessage: "입력하신 아이디가 존재하지 않습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      errorMessage: "잘못된 비밀번호입니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const getmypage = (req, res) => {
  return res.render("my-page");
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
  return res.render("change-password");
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
      errorMessage: "기존 비밀번호가 일치하지 않습니다.",
    });
  }
  if (newPassword !== newPassword2) {
    return res.status(400).render("change-password", {
      errorMessage: "비밀번호 확인란이 일치하지 않습니다.",
    });
  }
  user.password = newPassword;
  await user.save();
  return res.redirect("logout");
};

export const home = async (req, res) => {
  const images = await Image.find({})
  return res.render("home", {images});
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  if (!image) {
    return res.render("404");
  }
  return res.render("watch");
};
export const getUpload = (req, res) => {
  return res.render("upload");
};

export const postUpload = async (req, res) => {
  const { path: fileUrl } = req.file;
  const { title, description } = req.body;
  try {
    await Image.create({
      title,
      description,
      fileUrl,
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      errorMessage: "ㅇㅇ",
    });
  }
};

export const cart = (req, res) => res.render('cart');
export const cs = (req, res) => res.render('cs');
export const mypage = (req, res) => res.render('my-page');
export const track = (req, res) => res.render('track');
export const viewed = (req, res) => res.render('viewed');
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
