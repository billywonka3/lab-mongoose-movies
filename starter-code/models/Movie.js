const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    actor: Schema.ObjectId
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;