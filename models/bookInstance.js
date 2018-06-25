var mongoose = require('mongoose')

var Schema = mongoose.Schema

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.ObjectId, ref: 'Book', required: true }, // reference to the associated book
    currentPrice: { type: Number, required: true },
    currentTotalQuantity: { type: Number, required: true },
    size: { type: [Number, Number] },
    coverType: { type: String, required: true },
    imageCover: { type: [String], required: true },
    status: { type: String, enum: ['Còn hàng', 'Hết hàng'], required: true }
  }
)

BookInstanceSchema
  .virtual('url')
  .get(function () {
    return '/bookinstance/' + this._id
  })

// Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema)
