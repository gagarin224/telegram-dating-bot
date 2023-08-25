const { Schema, model } = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const reqDate = {
    type: Date,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}

const reqBoolen = {
    type: Boolean,
    required: true
}

const schema = Schema({
    chatId: reqString,
    name: reqString,
    age: reqNumber,
    gender: reqString,
    wantedGender: reqString,
    city: reqString,
    description: reqString,
    photo: reqString,
    status: reqBoolen,
    registerDate: reqDate
});

module.exports = model("user", schema);