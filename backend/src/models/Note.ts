import mongoose, {Schema} from "mongoose";


interface INote {
    userId: string;
    title: string;
    content: string;
    summary: string;
}


const noteSchema = new Schema({
    userId: String, 
    title: String, 
    content: String, 
    summary: String, 

}, {
    timestamps: true
})


export const Note = mongoose.model<INote>('Note', noteSchema)