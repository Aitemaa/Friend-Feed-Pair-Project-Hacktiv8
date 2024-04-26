const router = require('express').Router();
const Controller = require('../controllers/controller');
const authMiddleware = require('../middlewares/auth.middleware')
const adminMiddleware = require('../middlewares/admin.middleware')
const guestMiddleware = require('../middlewares/guest.middleware')

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
router.get('/signupPage', guestMiddleware, Controller.getSignUpPage);
router.post('/signupPage', guestMiddleware, Controller.postSignUpPage);
router.get('/loginPage', guestMiddleware, Controller.getLoginPage);
router.post('/loginPage', guestMiddleware, Controller.postLoginPage);

router.use(authMiddleware);

router.get('/logout', Controller.logout)
router.get('/homePage', Controller.getHomePage);
router.get('/homePage/addPost', Controller.getAddPost);
router.post('/homePage/addPost', upload.single('imageUrl'), Controller.postAddPost);
router.get('/userdetails', Controller.getUserDetails);
router.get('/userdetails/editProfile', Controller.editUserForm);
router.post('/userdetails/editProfile', Controller.postEditUserForm);
router.get('/userdetails/deletePost/:id', Controller.deletePostFromUser);
router.get('/adminPage', adminMiddleware, Controller.adminPage);
router.get('/adminPage/delete/:id', adminMiddleware, Controller.deleteAdminPage);

 
module.exports = router;