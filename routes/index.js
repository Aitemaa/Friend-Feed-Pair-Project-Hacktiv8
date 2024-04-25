const router = require('express').Router();
const Controller = require('../controllers/controller');
const authMiddleware = require('../middlewares/auth.middleware')

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, './public/images');
  },
  
  filename: (req, file, cb) => {
  cb(null, Date.now() + path.extname(file.originalname));
  },
});
  
const upload = multer({storage: storage});

router.get('/', Controller.getPage);
// landing page - redirect to Login page
router.get('/signupPage', Controller.getSignUpPage);
// validasi notempty & notnull
router.post('/signupPage', Controller.postSignUpPage);
// hooks before create hashing password pakai redirect ke LandingPage
router.get('/loginPage', Controller.getLoginPage);
// form buat login
router.post('/loginPage', Controller.postLoginPage);
// kalau email & password sesuai (compareSync) langsung masuk ke Landingpage / HomePage ada tombol sign up buat daftar akun

// router.use(authMiddleware);

router.get('/homePage', Controller.getHomePage);
// bikin tombol add Post redirect ke '/homePage/addPost'
router.get('/homePage/addPost', Controller.getAddPost);
router.post('/homePage/addPost', upload.single('imageUrl'), Controller.postAddPost);
router.get('/homePage/editPost/:id')
router.post('/homePage/editPost/:id')
router.post('userdetails/:id')
router.get('/adminPage', Controller.adminPage);
router.get('/adminPage/delete/:id', Controller.deleteAdminPage);

 
module.exports = router;