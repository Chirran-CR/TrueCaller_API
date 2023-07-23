const {Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfig.js");


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect:dbConfig.dialect,
        // operatorsAliases: false,
    }
)

sequelize.authenticate()
.then(()=>{
    console.log("DB Connected!!");
}).catch((err)=>{
    console.log("Error in db connection, error is:",err);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes);
db.contacts =require("./contactModel")(sequelize, DataTypes);
db.spams = require("./spamModel.js")(sequelize, DataTypes);

//one to many relationship b/n Users->Contact: one User can have many contact
db.users.hasMany(db.contacts,{ foreignKey:"linkedPhoneNo", as: "contacts"});
db.contacts.belongsTo(db.users,{
    foreignKey:"linkedPhoneNo" ,
    as:"user"
})

db.sequelize.sync({alter:true})
.then(()=>{
    console.log("Database re-synced successfully !!");
}).catch((err)=>{
    console.log("Error in db Syncing, error is:",err);
})

module.exports = db;