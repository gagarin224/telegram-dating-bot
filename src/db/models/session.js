import { Schema, model } from 'mongoose';

const schema = new Schema({
    key: { type: String, unique: true, required: true },
    data: { type: Object, required: true },
});

export default model("session", schema);