// db.js

const {Sequelize,DataTypes} = require('sequelize');

// Database setup
const sequelize = new Sequelize('cointab', 'root', '1234', {
    host:'localhost',
    dialect: 'mysql'
});

// Define models

//user model
const User = sequelize.define('user', {
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    unique:true,
    primaryKey:true
  },
  name: {
    type:DataTypes.STRING,
    allowNull:false
  },
  email: {
    type:Sequelize.STRING,
    allowNull:false
},
  phone: {
    type:Sequelize.STRING,
    allowNull:false
},
  website: {
    type:Sequelize.STRING,
    allowNull:false
},
  city: 
  {type:Sequelize.STRING,
    allowNull:false
},
  company: {
    type:Sequelize.STRING,
    allowNull:false
}
});


//post model
const Post = sequelize.define('post', {
  userId: {
    type:DataTypes.INTEGER,
    allowNull:false,
    // references:{
    //   model:"User",
    //   key:"id"
    // }
  },
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false
  },
  body: {
    type:DataTypes.TEXT,
    allowNull:false
  },
  company:{
    type:DataTypes.STRING,
    allowNull:false
  }
});

module.exports = {
  sequelize,
  User,
  Post
};
