const express = require('express')
const router = express.Router()
const {checkuserSignup,checkuserLogin,validate}=require('../middlewares/middlewareUser')
const {signupSubmit,getuser,loginSubmit,logout}=require('../controllers/userControll')


router.get('/signup',checkuserSignup,getuser)

router.post('/signupSubmit',signupSubmit)

router.get('/',checkuserLogin,getuser)

router.post('/userLogin',validate,loginSubmit)

router.get('/logout',logout)




module.exports = router








