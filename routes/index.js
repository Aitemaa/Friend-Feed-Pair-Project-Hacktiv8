const router = require('express').Router();


router.get('/');	
// landing page - redirect to Login page
router.get('/loginPage');
// form buat login
router.post('/loginPage');
// kalau email & password sesuai (compareSync) langsung masuk ke Landingpage / HomePage ada tombol sign up buat daftar akun
router.get('/signupPage');
// validasi notempty & notnull
router.post('/signupPage');
// hooks before create hashing password pakai redirect ke LandingPage
router.get('/homePage');
// bikin tombol add Post redirect ke '/homePage/addPost'
router.get('/homePage/addPost');

module.exports = router;