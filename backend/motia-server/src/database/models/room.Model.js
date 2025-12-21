import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    roomID:{
        type:String,
    },
    role:{
        type:Boolean,
    },
    number:{
        type:Number,
        required:true,
    }

},{ timestamps:true});

export const Room = mongoose.model('Room', roomSchema);