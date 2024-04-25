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
            res.render('signupForm');
        } catch (error) {
            res.send(error)
        }
    }

    static async postSignUpPage(req, res) {
        try {
            const {username, email, password, birthday, gender} = req.body;
            const newUser = await User.create({username, email, password});
            const UserId = newUser.id;
            await UserDetail.create({birthday, gender, UserId})
            res.redirect('/loginPage')
        } catch (error) {
            res.send(error)
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
                // if (!user) {
                //     return res.redirect(`/loginPage?error=${error}`)
                // }
                
                const validatePassword = bcrypt.compareSync(password, user.password);
                if (!validatePassword){
                    return res.redirect(`/loginPage?error=${error}`)
                }                
                req.session.user = await user;
                res.redirect('/homePage')
              
            } catch (error) {
                res.send(error)
            }
        }

    static async getHomePage(req, res) {
        try {
            res.send(req.session.user)
            // res.render('homePage')
        } catch (error) {
            res.send(error)
        }
    }

    static async getAddPost(req, res) {
        try {
            res.render()
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller;