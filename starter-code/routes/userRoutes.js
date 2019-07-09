const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const bcrypt  = require('bcrypt');

router.get('/signup', (req, res, next)=>{
    res.render('user/signup');
})
router.post('/signup', (req, res, next)=>{
    const theUsername = req.body.theUsername;
    const thePassword = req.body.thePassword;

    const salt = bcrypt.genSaltSync(12);
    const hashedPass =  bcrypt.hashSync(thePassword, salt);

    User.create({
        username: theUsername,
        password: hashedPass
    })
    .then(()=>{
        console.log('success!');
        res.redirect('/')
    })
    .catch((err)=>{
        next(err);
    })
})

router.get('/login', (req, res, next)=>{
    if(req.session.errorCount <= 0){
        req.session.errorMessage = null;
    }
    req.session.errorCount -=1;
    res.render('user/login', {error: req.session.errorMessage})
})
router.post('/login', (req, res, next)=>{
    const username = req.body.theUsername;
    const password = req.body.thePassword;

    // if (username === "" || password === "") {
    //     res.render("auth/login", {
    //       errorMessage: "Please enter both, username and password to sign up."
    //     });
    //     return;
    // }

    User.findOne({ "username": username })
    .then(user => {
        if (!user) {
            req.session.errorMessage = "Sorry, no one with that username found";
            req.session.errorCount = 1
            res.redirect('/login');
        } if (bcrypt.compareSync(password, user.password)) {
            req.session.currentUser = user;
            res.redirect('/');
        } else {
            req.session.errorMessage = 'Wrong password';
            req.session.errorCount = 1;
            res.redirect('/login');
        }
    })
    .catch(error => {
        next(error);
    })
})

router.get('/profile', (req, res, next)=>{
    if(req.session.currentUser){
        res.render('user/profile', {user: req.session.currentUser})
    } else {
        req.session.errorCount = 1;
        req.session.errorMessage = "Sorry, you must be logged in to use that feature please log in"
        res.redirect('/login')
    }
})

router.post('/logout', (req, res, next)=>{
    req.session.destroy()
    res.redirect('/login')
})

module.exports = router;