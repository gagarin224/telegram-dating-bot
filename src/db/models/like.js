const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const reqBoolen = {
    type: Boolean,
    required: true
}

const schema = Schema({
    userId: reqString,
    memberId: reqString,
    status: reqBoolen,
    message: String
});

module.exports = model("like", schema);