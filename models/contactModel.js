
module.exports = (sequelize, DataTypes) =>{
    const Contact = sequelize.define("contact",{
        contactName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        contactNum:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    },{
        timestamps:false,
    });
    return Contact;
}