const express = require("express");
const mongo = require("../models/adminSchema");
const userCol = require("../models/userSchema");
const bycrypt = require("bcrypt");

function getAdmin(req, res) {
  res.render("admin/Home");
}

async function adminLogin(req, res) {
  try {
    const requestData = req.body;
    const statusOfAdmin = "invalid username or password";
    const data = await mongo.findOne({ email: requestData.email });
    if (!data) {
      res.render("admin/Login", { statusOfAdmin });
    } else {
      if (
        data.email === requestData.email &&
        data.password == requestData.password
      ) {
        req.session.adminid = req.body.email;

        res.redirect('/admin')
      } else {
        res.render("admin/Login", { statusOfAdmin });
      }
    }
  } catch (error) {
    console.log(error);

    res.render("admin/error");
  }
}

function adminLogout(req, res) {
  req.session.adminid = null;
  res.clearCookie();
  res.redirect("/admin");
}

async function view(req, res) {
  try {
    let list = await userCol.find({});

    let arr = list.map((ob) => {
      return {
        userId: ob._id,
        password: ob.password,
        fullName: ob.fullName,
        email: ob.email,
        phone: ob.phone,
        city: ob.city,
      };
    });

    res.render("admin/UsersList", { arr });
  } catch (error) {
    console.log(error);

    res.render("admin/error");
  }
}

async function edit(req, res) {
  try {
    let em = req.query.email;
    let edd = await userCol.find({ email: em });
    let brr = edd.map((ob) => {
      return {
        email: ob.email,
        password: ob.password,
        fullName: ob.fullName,
        phone: ob.phone,
        city: ob.city,
      };
    });

    const details = {
      email: brr[0].email,
      password: brr[0].password,
      fullName: brr[0].fullName,
      phone: brr[0].phone,
      city: brr[0].city,
    };

    res.render("admin/edit", { details });
  } catch (error) {
    res.render("admin/error");
    console.log(error);
  }
}

async function editSubmit(req, res) {
  try {
    let hash = await bycrypt.hash(req.body.password, 10);

    req.body.password = hash;

    await userCol.updateOne({ email: req.body.email }, req.body, {
      upsert: false,
    });

    res.redirect("/view");
  } catch (error) {
    res.render("admin/error");
    console.log(error);
  }
}

async function deletUser(req, res) {
  try {
    let de = req.query.email;

    let dta = await userCol.find({ email: de });

    let ld = dta.map((ob) => {
      return {
        email: ob.email,
        password: ob.password,
        fullName: ob.fullName,
        phone: ob.phone,
        city: ob.city,
      };
    });

    email = ld[0].email;

    await userCol.deleteOne({ email });

    if(req.session.userid==req.query.email){

      req.session.userid = null;
    }

    

    res.redirect("/view");
  } catch (error) {
    res.render("admin/error");

    console.log(error);
  }
}

function back(req, res) {
  res.redirect("/admin");
}

function createUser(req, res) {
  res.render("admin/create");
}

async function createUserSubmit(req, res) {
  try {
    let hash = await bycrypt.hash(req.body.password, 10);

    req.body.password = hash;

    await userCol.create(req.body);

    res.redirect("/view");
  } catch (error) {
    console.log(error);

    res.render("admin/error", { already: "already submitted" });
  }
}

function SearchUser(req, res) {
  res.render("admin/search");
}

async function searchPost(req, res) {
  try {
    let queryy = req.body.query;

    let reg = new RegExp(`^${queryy}`, "i");

    let result = await userCol.find({ fullName: { $regex: reg } });

    let serachResult = result.map((ob) => {
      return {
        email: ob.email,
        password: ob.password,
        fullName: ob.fullName,
        phone: ob.phone,
        city: ob.city,
      };
    });

    res.render("admin/search", { serachResult });
  } catch (error) {
    console.log(error);

    res.render("admin/error");
  }
}




module.exports = {
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
};
