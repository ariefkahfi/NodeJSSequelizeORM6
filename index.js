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

// sequelize.sync();

// Managed Transaction (auto-callback)
function doTransaction(){
sequelize.transaction((tx)=>{
        return PersonModel.create({
            name:"aa1"
        },{
            transaction:tx
        })
    }).then(result=>{
        console.log("COMMIT_HERE");
        console.log(result);
    }).catch(err=>{
        console.error("ROLLBACK_HERE");
        console.error(err);
    })
}
// doTransaction();

// Unmanaged Transaction (manual commit and rollback)
function unManagedTrx(personName){
    sequelize.transaction().then(tx=>{
        // transaction logic here
        // return....
        PersonModel.create({
            name: personName
        },{
            transaction:tx
        }).then(()=>{
            console.log("COMMIT TRANSACTION");
            return tx.commit();
        }).catch(err=>{
            console.log("ROLLBACK TRANSACTION");
            return tx.rollback();
        })
    });
}

unManagedTrx("aa3");
