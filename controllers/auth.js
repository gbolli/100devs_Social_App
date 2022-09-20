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
    }
}