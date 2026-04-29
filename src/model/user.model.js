import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 1,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        trim: true,

        minLength: 8,
        maxLength: 50
    },
    email: {

        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    }

}, { timestamps: true });

userSchema.pre('save'), async function (next) {
    if(!this.isModified('passwords')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
}

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

export const User = mongoose.model('User', userSchema);