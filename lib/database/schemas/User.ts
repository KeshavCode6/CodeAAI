import mongoose, { Schema } from "mongoose";

const userSchema : Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    id: {
        type: String,
        required: true
    }, 
    challenges: {
        type: Array, 
        required: true
    }, 
    points: {
        type: Number, 
        required: true
    }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;