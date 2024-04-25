module.exports = (req, res, next) => {
    if (!req.session.user){
        const error = "Please login first"
        return res.redirect(`/loginPage?error=${error}`)
    }
    next();
}