var mongoose = require('mongoose')

var Schema = mongoose.Schema

var BookSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 200 },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    publisher: { type: Schema.Types.ObjectId, ref: 'Publisher', required: true },
    publishDate: { type: Date, required: true },
    price: { type: Number, required: true },
    genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
    description: { type: String }
  }
)
BookSchema.index({title: 'text'})
// BookSchema
//   .virtual('url')
//   .get(function () {
//     return '/book/' + this._id
//   })

// Export model
module.exports = mongoose.model('Book', BookSchema)
