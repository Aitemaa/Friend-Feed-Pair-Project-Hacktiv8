const {User, UserDetail, PostCategory, Post, Category} = require('../models');
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
            const data = await Post.findAll({
                include: [
                    {
                        model: User,
                    },
                    {
                        model: Category,
                        through: {
                            model: PostCategory,
                        },
                    },
                ],
            });

            const user = await User.findByPk(req.session.user.id)

            const categoryList = await Category.findAll();
            // res.send(categoryList)

            res.render('homePage', {data, user, categoryList})
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
            const UserId = req.session.user.id
            let imageUrl;
            if (req.file){
                imageUrl = `http://localhost:3000/images/${req.file.filename}`;
            }
            const newPost = await Post.create({title, content, imageUrl, UserId});
            const PostId = newPost.id
            await PostCategory.create({PostId, CategoryId})
            res.redirect('/homePage')
        } catch (error) {
            res.send(error)
        }
    }

    static async adminPage(req, res) {
        try {
            let data = await Post.findAll({
                include: User
            })
            res.render('adminPage', {data});
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteAdminPage(req, res) {
        try {
            let id = req.params.id
            const deletedData = await Post.findByPk(id);
            await deletedData.destroy();
            res.redirect('/adminPage')
        } catch (error) {
            res.send(error)
        }
    }

    static async postUserDetails(req, res) {
        try {
            res.send(data);
        } catch (error) {
            res.send(error)
        }
    }

    static async getUserDetails(req, res) {
        try {
            res.send(data);
        } catch (error) {
            res.send(error)
        }
    }

    static async editPostUserDetails(req, res) {
        try {
            res.send(data);
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller;