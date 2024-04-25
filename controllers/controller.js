const {User, UserDetail, postCategory, Post, Category} = require('../models');
const bcrypt = require('bcryptjs');

class Controller {
    static async getPage(req, res) {
        try {
            res.redirect('loginPage');
        } catch (error) {
            res.send(error)
        }
    }

    static async getLoginPage(req, res) {
        try {
            res.render('LoginPage');
        } catch (error) {
            res.send(error)
        }
    }
    
        static async postLoginPage(req, res) {
            try {
                const {email, password} = req.body;
                const data = await User.findOne({
                    where: {email: email}
                })
                const validate = bcrypt.compareSync(password, data.password);
                if (validate){
                    res.send(password, 'password benar')
                }
               res.send(data);
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
            User.create({username, email, password});
            res.send(req.body);
        } catch (error) {
            res.send(error)
        }
    }

    static async getHomePage(req, res) {
        try {
            res.render('homePage')
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