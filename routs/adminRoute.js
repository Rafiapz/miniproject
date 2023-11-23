const express = require("express");
const router = express.Router();
const { checkSession } = require("../middlewares/middlewareAdmin");

const {
  getAdmin,
  adminLogin,
  adminLogout,
  view,
  edit,
  editSubmit,
  deletUser,
  back,
  createUser,
  createUserSubmit,
  SearchUser,
  searchPost,
  dltEmail,
} = require("../controllers/adminControll");


router.get("/admin", checkSession, getAdmin);

router.post("/adminLogin", adminLogin);

router.get("/adminLogout", adminLogout);

router.get("/view", checkSession, view);

router.get("/edit", checkSession, edit);

router.post("/editSubmit", checkSession, editSubmit);

router.get("/delete", checkSession, deletUser);

router.get("/back", checkSession, back);

router.get("/createUser", createUser);

router.post("/createUserSubmit", checkSession, createUserSubmit);

router.get("/searchPage", checkSession, SearchUser);

router.post("/Search", checkSession, searchPost);




module.exports = router;
