import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    rooms:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Room',
        }
    ]
},{ timestamps:true});

export const User = mongoose.model('User', usersSchema);