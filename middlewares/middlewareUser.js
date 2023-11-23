const express = require('express')
const mongo = require('../models/userSchema')
const bcrypt = require('bcrypt')


function checkuserSignup(req,res){

    if (req.session.userid) {

        res.redirect('/')
    } else {

        res.render('user/signup')
    }
}

function checkuserLogin(req,res,next){

    if(req.session.userid){

        next()
    }else{
        res.render('user/login')
        
    }
}

async function validate(req,res,next){

    const requestData = req.body;
    const data = await mongo.findOne({ email: requestData.email });
    let invalid = "incorrect username or password";

    if (!data) {
      res.render("user/login", { invalid });
    } else {
      let validation = await bcrypt.compare(
        requestData.password,
        data.password
      );

      if(validation==true){
        next()
      }else{
        res.render("user/login", { invalid });
      }
}
}

module.exports={checkuserSignup,checkuserLogin,validate}