const Sequelize=require('sequelize')
const {pass}=require('./pass.js');
const db=new Sequelize({
    dialect:'sqlite',
    storage:__dirname+'/test.db'
})
const check=async function(){
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
check()
const aid={
    type:Sequelize.DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
}
const room=db.define('room',{
      id:aid,
      room_no:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull:false
      }
})
const student=db.define('student',{
    id:aid,
    name:{
        type:Sequelize.DataTypes.STRING(100),
        allowNull:false
    },
    admission_no:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
    },
    email:{
        type:Sequelize.DataTypes.STRING(200),
        allowNull:false
    },
    password:{
        type:Sequelize.DataTypes.STRING(300),
        allowNull:false
    }
})
const token=db.define('token',{
    id:aid,
    token:{
        type:Sequelize.DataTypes.STRING(300),
    }
})
const admin=db.define('admin',{
    id:aid,
    name:{
        type:Sequelize.DataTypes.STRING(100),
        allowNull:false
    },
    email:{
        type:Sequelize.DataTypes.STRING(200),
        allowNull:false
    },
    password:{
        type:Sequelize.DataTypes.STRING(300),
        allowNull:false
    }
})
token.belongsTo(student)
student.hasMany(token)

token.belongsTo(admin)
admin.hasMany(token)

student.belongsTo(room)
room.hasMany(student)
db.sync(/*{force:true}*/)
.then(()=>console.log("created modals succesfully"))
.catch((error)=>console.log("error:",error))
module.exports={
    student,room,token,admin
}