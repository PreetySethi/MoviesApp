const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Movie = new Schema({
   name: {
      type: String
   },
   rating: {
      type: String
   }
}, {
   collection: 'movies'
})

module.exports = mongoose.model('Movie', Movie)