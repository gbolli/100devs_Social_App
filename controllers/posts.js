module.exports = {
    getProfile: (req, res) => {
        res.render('profile.ejs', {
            user: req.user,
            title: 'Profile'
        })
    },
    getFeed: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: 'desc' }).lean();
            res.render('feed.ejs', { posts: posts });
        } catch (err) {
            console.log(err);
        }
      },
}