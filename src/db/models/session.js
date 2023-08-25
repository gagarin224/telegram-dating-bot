const { Schema, model } = require('mongoose');

const schema = new Schema({
    key: { type: String, unique: true, required: true },
    data: { type: Object, required: true },
});

module.exports = model("session", schema);