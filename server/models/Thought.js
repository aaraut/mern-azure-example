const mongoose = require('mongoose')

const ThoughtScema = mongoose.Schema({
    thought: string,
    dateCreated: Date
})

const Thought = mongoose.model('Thought', ThoughtScema);

module.exports = Thought;
