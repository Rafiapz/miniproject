const express = require("express");

function checkSession(req,res,next){

    if (req.session.adminid) {
        next()
      } else {
        res.render("admin/Login");
      }
}



module.exports={checkSession}