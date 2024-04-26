module.exports = (req, res, next) => {
    if (req.session.user.role !== "admin"){
        res.send('ini punya admin brow')
    }
    next();
}