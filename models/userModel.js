module.exports = (sequelize, DataTypes) =>{
     const User = sequelize.define("user",{
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true,
            //add exact length to 10 for each number
        },
        emailAddress:{
            type:DataTypes.STRING,
            defaultValue:"",
        }
     });
     return User;
}