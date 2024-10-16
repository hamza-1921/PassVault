import mongoose, { Schema, model } from 'mongoose';

const passwordsSchema = new Schema({
    username: { type: String, required: true,unique:false },
    passwords: { type: Schema.Types.Mixed ,  required: true },
    key: { type: String, required: true },     
    iv: { type: String, required: true },   
    Url : {type: String, required:true},
    Name : {type:String,required:false,},
NameU : {type:String,required:false,},
});

const Passwords = mongoose.models.Passwords || model('Passwords', passwordsSchema);

export default Passwords;