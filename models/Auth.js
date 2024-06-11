import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/AuthDb').then(()=>{
    console.log('Connected to Db successfully');
}).catch((err)=>{
    console.error(err);
})


const AuthSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true});

const User = mongoose.model('User',AuthSchema);

export default User;