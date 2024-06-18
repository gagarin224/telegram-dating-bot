import { Schema, model } from 'mongoose';

const reqString = {
    type: String,
    required: true
};

const reqBoolen = {
    type: Boolean,
    required: true
};

const schema = new Schema({
    userId: reqString,
    memberId: reqString,
    status: reqBoolen,
    message: String
});

export default model("like", schema);