import mongoose, { Schema } from "mongoose";

const userSchema : Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    id: {
        type: String,
        required: true,
        unique:true
    }, 
    challenges: {
        type: Object, 
        required: true,
        default: {"challenge_1":"unopened"}
    }, 
    points: {
        type: Number, 
        required: true,
        default: 0
    },
    image: {
        type: String, 
        required: true,
        default: ""
    }
})


export interface IUser {
    name: string;
    id: string;
    challenges: object;
    points: number;
    image: string;
}
export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;