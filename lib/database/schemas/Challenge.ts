import mongoose, { Schema } from "mongoose";

const challengeSchema : Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    id: {
        type: String,
        required: true,
        unique:true
    }, 
    hints: {
        type: Array, 
        required: true,
        default: []
    }, 
    points: {
        type: Number, 
        required: true,
        default: 0
    }
})

export interface IChallenge {
    name: string;
    id: string;
    description: string;
    hints?: [];
    points: number;
}
export const Challenge = mongoose.models.Challenge || mongoose.model<IChallenge>('Challenge', challengeSchema);
export default Challenge;