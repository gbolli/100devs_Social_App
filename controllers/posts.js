const Post = require('../models/Post')
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.user.id })
            res.render('profile.ejs', {
                user: req.user,
                posts: posts
            })
        } catch (error) {
            console.error(error)
        }
    },
    getFeed: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: 'desc' }).lean();
            res.render('feed.ejs', { posts: posts });
        } catch (err) {
            console.log(err);
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            res.render('post.ejs', { post: post, user: req.user })
        } catch (error) {
            console.error(error)
        }
    },
    createPost: async (req, res) => {
        try {
            // upload to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path)

            await Post.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                caption: req.body.caption,
                likes: 0,
                user: req.user.id
            })
            console.log('Post has been added!')
            res.redirect('/profile')
        } catch (error) {
            console.error(error)
        }
    }
}