var mongoose = require('mongoose')

var Schema = mongoose.Schema

var GenreSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100}
  }
)

GenreSchema
  .virtual('url')
  .get(function () {
    return '/genre/' + this._id
  })

// Export model
module.exports = mongoose.model('Author', GenreSchema)
