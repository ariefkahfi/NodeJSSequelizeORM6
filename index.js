const Sequelize = require("sequelize");
const sequelize = new Sequelize("s_orm5","arief","123",{
    dialect:"mysql",
    operatorsAliases:false
});

const PersonModel = sequelize.define("person",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        field : "person_id"
    },
    name:{
        type:Sequelize.STRING,
        field:"person_name"
    }
},{
    tableName:"person",
    timestamps:false
});

// Managed Transaction (auto-callback)
