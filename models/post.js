'use strict';
const {Op, 
  Model,
  where
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    Post.belongsToMany(models.Category, {
      through: models.PostCategory
    }),
    Post.belongsTo(models.User)
    }

    static async getPostBySearch(search, User, Category, PostCategory){
        let options = {
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
          where: {}
      };

      if (search){
        options.where.title = {[Op.iLike]: `%${search}%`}
      }
      return Post.findAll(options);
      
      
      
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};