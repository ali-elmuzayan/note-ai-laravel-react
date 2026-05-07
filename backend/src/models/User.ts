import mongoose, {Schema } from "mongoose";


interface IUser {
    name: string;
    email: string;
    clerkId: string;
}


const userSchema = new Schema({
    name: {
        type: String, 
        required: true, 
    }, 
    email: {
        type: String, 
        required: true, 
    }, 
    clerkId: {
        type: String, 
        required: true, 
    }
}, {
    timestamps: true
})

export const User = mongoose.model<IUser>('User', userSchema)