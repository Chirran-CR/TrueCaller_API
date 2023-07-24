
module.exports = (sequelize, DataTypes) =>{
     const GlobalUser = sequelize.define("globalUser",{
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        emailAddress:{
            type:DataTypes.STRING,
            defaultValue:"",
        },
        registeredUser:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        },
        // noOfPeopleMarkAsSpam:{
        //     type:DataTypes.INTEGER,
        //     defaultValue:0
        // }
     },{
        timestamps:false
     });
     return GlobalUser;
}