const {Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfig.js");


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        // port:3306,
        // dialect:'mysql',
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

db.sequelize.sync({force:false})
.then(()=>{
    console.log("Database re-synced successfully !!");
}).catch((err)=>{
    console.log("Error in db Syncing, error is:",err);
})

module.exports = db;