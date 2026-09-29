const express=require('express')
const router=express.Router()

const userController=require('../controller/userController')
const auth=require("../middlware/auth")
const passport = require('passport');


router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser)
router.get('/allUser',userController.allUser)
router.get('/:id',userController.oneUser)
router.put('/update/:id',userController.updateUser)
router.delete('/delete/:id',userController.deleteUser)


// Google OAuth
router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);


// Google callback
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=Google authentication failed`
    }),
    userController.googleLogin
)


module.exports=router