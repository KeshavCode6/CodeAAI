import mongoose, { Schema } from "mongoose";

const challengeSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    arguments: {
        type: [String],
        required: true,
        default: []
    },
    testCases: {
        type: [
            {
                args: {
                    type: Map,
                    of: Schema.Types.Mixed, // Use 'Mixed' to allow any type of value in the map
                    required: true,
                    default: {} // Default to an empty map
                },
                output: {
                    type: Schema.Types.Mixed,
                    required: true
                }
            }
        ],
        required: true,
        default: []
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    isDaily: {
        type: Boolean,
        required: true,
        default: false
    },
    solves: {
        type: Number,
        required: false,
        default: 0
    },
    author:{
        type:String,
        require:true,
    }
});

export interface IChallenge {
    name: string;
    id: string;
    description: string;
    arguments: string[];
    difficulty: string;
    points: number;
    isDaily: boolean;
    solves?: number;
    author:string;
    testCases: ITestCase[];
}

export interface ITestCase {
    args: Map<string, any>, // Use Map to represent key-value pairs
    output: any
}

export const Challenge = mongoose.models.Challenge || mongoose.model<IChallenge>('Challenge', challengeSchema);
export default Challenge;
