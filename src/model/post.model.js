import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
     name : {
        type: String,
        trim: true,
        required: true,
     },
     description: {
        type: String,
       trim: true,
       required: true
     },
     age: {
        type: Number,
        min: 1,
        max: 150,
        required: true,  
     }
     
}, {
    timestamps: true,
});


export const  Post = mongoose.model('Post', postSchema);