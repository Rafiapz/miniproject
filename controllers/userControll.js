const express = require("express");
const mongo = require("../models/userSchema");
const bcrypt = require("bcrypt");
const productsCol = require("../models/products");

async function signupSubmit(req, res) {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    await mongo.create(req.body);
    res.render("user/login", { submission: "Submitted Successfully" });
  } catch (error) {
    let dupli = "Username already exists";
    res.render("user/error", { dupli });
    console.log(error);
  }
}

async function getuser(req, res) {
  try {
    
    const requestData = await mongo.find({});
    let val;
    for (let i = 0; i < requestData.length; i++) {
      if (requestData[i].email == req.session.userid) {
        val = requestData[i].fullName;
      }
    }

    let productsData = await productsCol.find({});
    let products = productsData.map((ob) => {
      return {
        no: ob.no,
        product: ob.product,
        price: ob.price,
        available: ob.available,
      };
    });
    let customer;

    if(!val){

      customer='User'
    }else{

      customer=val
    }

    res.render("user/home", { products, customer });
  } catch (error) {
    console.log(error);
    res.render('user/error')
    
  }
}

async function loginSubmit(req, res) {
  try {
    
    req.session.userid = req.body.email;

    res.redirect('/')
  } catch (error) {
    res.render("user/error");

    console.log(error);
  }
}

async function logout(req,res) {
  req.session.userid = null;
  res.clearCookie();
  res.redirect("/");
}

module.exports = { signupSubmit, getuser, loginSubmit, logout };

