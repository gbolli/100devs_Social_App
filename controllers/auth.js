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
    postLogin: (req, res) => {
        res.render('profile.ejs', {
            title: 'Profile',
            user: {
                userName: 'Papa',
                email: 'blah@blah.blah'
            }
        })
    },
    postSignup: (req, res) => {
        res.render('profile.ejs', {
            title: 'Profile'
        })
    }
}