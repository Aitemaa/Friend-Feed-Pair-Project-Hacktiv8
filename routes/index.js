const router = require('express').Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.getPage);
// landing page - redirect to Login page
router.get('/loginPage', Controller.getLoginPage);
// form buat login
router.post('/loginPage', Controller.postLoginPage);
// kalau email & password sesuai (compareSync) langsung masuk ke Landingpage / HomePage ada tombol sign up buat daftar akun
router.get('/signupPage', Controller.getSignUpPage);
// validasi notempty & notnull
router.post('/signupPage', Controller.postSignUpPage);
// hooks before create hashing password pakai redirect ke LandingPage
router.get('/homePage', Controller.getHomePage);
// bikin tombol add Post redirect ke '/homePage/addPost'
router.get('/homePage/addPost', Controller.getAddPost);

module.exports = router;