
import mongoose from 'mongoose';


const teacherSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type : String, required : true , unique : true},
    password : {type : String, required : true},
    school : {type : mongoose.Schema.Types.ObjectId , ref : 'School'},
    createdAt : {type : Date, default : Date.now}
})

export default mongoose.model('Teacher', teacherSchema);