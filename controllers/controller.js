const {User, UserDetail, postCategory, Post, Category} = require('../models');
const bcrypt = require('bcryptjs');
const session = require('express-session')

class Controller {
    static async getPage(req, res) {
        try {
            res.redirect('loginPage');
        } catch (error) {
            res.send(error)
        }
    }

    static getSignUpPage(req, res) {
        try {
            const errorQuery = req.query.error;
            res.render('signupForm', {errorQuery});
        } catch (error) {
            res.send(error)
        }
    }

    static async postSignUpPage(req, res) {
        try {
            const {username, email, password} = req.body;
            const newUser = await User.create({username, email, password});
            res.redirect('/loginPage')
        } catch (error) {
            console.log(req.body)
            if (error.name === "SequelizeValidationError"){
                let errorList = error.errors.map(e => {
                    return e.message
                });
                res.redirect(`?error=${errorList}`)
            } else {
                res.send(error);
            }
        }
    }

    static async getLoginPage(req, res) {
        try {
            const errorQuery = req.query.error;
            res.render('LoginPage', {errorQuery});
        } catch (error) {
            res.send(error)
        }
    }
    
    static async postLoginPage(req, res) {
         try {
            const {email, password} = req.body;
            const user = await User.findOne({
                 where: {email}
              });
                

            const error = 'Invalid Username/Password';
                if (!user) {
                 return res.redirect(`/loginPage?error=${error}`)
                }
                
            const validatePassword = bcrypt.compareSync(password, user.password);
                if (!validatePassword){
                 return res.redirect(`/loginPage?error=${error}`)
                }                
                req.session.user = user.toJSON();
                res.redirect('/homePage')
            } catch (error) {
                if (error.name === "SequelizeValidationError"){
                    let errorList = error.errors.map(e => {
                        return e.message
                    });
                    res.redirect(`?error=${errorList}`)
                } else {
                    res.send(error);
                }
            }
        }

    static async getHomePage(req, res) {
        try {
            // res.send(req.session.user)
            const data = await Post.findAll();
            res.render('homePage', {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async getAddPost(req, res) {
        try {
            const data = await Category.findAll();
            res.render('AddPost', {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async postAddPost(req, res) {
        try {
            const {title, content, CategoryId} = req.body;
            if (req.file.imageUrl){
                const imageUrl = req.file;
            }
            console.log(title, content, CategoryId,imageUrl)
            res.send(req.body);
        } catch (error) {
            res.send(error)
        }
    }

    static async adminPage(req, res) {
        try {
            res.render('adminPage')
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteAdminPage(req, res) {
        try {
            res.send(req.body);
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller;