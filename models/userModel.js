const bcrypt = require("bcrypt");

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
            // autoIncrement:true,
            primaryKey:true,
            //add exact length to 10 for each number
        },
        emailAddress:{
            type:DataTypes.STRING,
            defaultValue:"",
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            set(val){
                const salt = bcrypt.genSaltSync(10);
                const hashPsd = bcrypt.hashSync(val, salt);
                this.setDataValue("password",hashPsd);
            }
        }
     },{
        timestamps:false
     });
     return User;
}