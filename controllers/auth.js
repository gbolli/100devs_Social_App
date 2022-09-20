const passport = require('passport')
const User = require('../models/User')


module.exports = {
    getLogin: (req, res) => {
        res.render('login.ejs', {
            title: 'Login'
        })
    },
    getSignup: (req, res) => {
        res.render('signup.ejs', {
            title: 'Create Account'
        })
    },
    getProfile: (req, res) => {
        res.render('profile.ejs', {
            user: req.user,
            title: 'Profile'
        })
    },
    postLogin: (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
              return next(err)
            }
            if (!user) {
              //req.flash("errors", info)
              return res.redirect("/login")
            }
            req.logIn(user, (err) => {
              if (err) {
                return next(err)
              }
              //req.flash("success", { msg: "Success! You are logged in." })
              res.redirect(req.session.returnTo || "/profile")
            })
          })(req, res, next)
    },
    postSignup: (req, res, next) => {
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
        })
        
        User.findOne(
            { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
            (err, existingUser) => {
                if (err) {
                    return next(err)
                }
                if (existingUser) {
                    // req.flash("errors", {
                    // msg: "Account with that email address or username already exists.",
                    // })
                    return res.redirect("../signup")
                }
                user.save((err) => {
                    if (err) {
                        return next(err)
                    }
                    req.logIn(user, (err) => {
                        if (err) {
                            return next(err)
                        }
                        res.redirect("/profile")
                    })
                })
            }
        )
    },
    getLogout: (req, res) => {
        req.logout(() => {
            console.log('User has logged out.')
        })
        req.session.regenerate((err) => {
            if (err) console.log("Error : Failed to destroy the session during logout.", err)
            req.user = null
            res.redirect('/')
        })
    }
}