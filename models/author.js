var mongoose = require('mongoose')

var Schema = mongoose.Schema

var AuthorSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    birthDate: {type: Date, required: true},
    gender: {type: String, required: true, enum: ['Nam', 'Nữ']},
    nationality: {type: String, required: true}
  }
)

AuthorSchema
  .virtual('url')
  .get(function () {
    return '/author/' + this._id
  })

// Export model
module.exports = mongoose.model('Author', AuthorSchema)
