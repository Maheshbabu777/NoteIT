import mongoose from 'mongoose';

// first creation of a schema
// then model based off that schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;