
import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    password: { type: Schema.Types.Mixed, required: true },
});

const User = mongoose.models.User || model('User', userSchema);

export default User;
