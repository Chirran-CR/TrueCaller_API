module.exports = (sequelize, DataTypes)=>{
    const Spam = sequelize.define("spam",{
        phoneNum:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true,
        },
        whoMarkedSpam:{
            type:DataTypes.STRING,
            get:function(){
                return JSON.parse(this.getDataValue("whoMarkedSpam"));
            },
            set:function(val){
                return this.setDataValue("whoMarkedSpam",JSON.stringify(val));
            },
            defaultValue:"[]"
        }
    },{
        timestamps:false
    });
    return Spam;
}