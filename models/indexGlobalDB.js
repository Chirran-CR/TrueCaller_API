const {Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfigGlobal.js");


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
    console.log("Global DB Connected!!");
}).catch((err)=>{
    console.log("Error in global db connection, error is:",err);
})

const gdb = {};

gdb.Sequelize = Sequelize;
gdb.sequelize = sequelize;

gdb.globalUsers = require("./globalUserModel")(sequelize, DataTypes);

//one to many relationship b/n Users->Contact: one User can have many contact
// db.users.hasMany(db.contacts,{ foreignKey:"linkedPhoneNo", as: "contacts"});
// db.contacts.belongsTo(db.users,{
//     foreignKey:"linkedPhoneNo" ,
//     as:"user"
// })

gdb.sequelize.sync({alter:true})
.then(()=>{
    console.log("Global-Database re-synced successfully !!");
}).catch((err)=>{
    console.log("Error in gdb Syncing, error is:",err);
})

module.exports = gdb;