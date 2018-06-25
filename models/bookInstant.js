var mongoose = require('mongoose')

var Schema = mongoose.Schema

var BookInstantSchema = new Schema(
  {
    book: { type: Schema.ObjectId, ref: 'Book', required: true }, // reference to the associated book
    currentPrice: { type: Number, required: true },
    currentTotalQuantity: { type: Number, required: true },
    size: { type: [Number, Number] },
    coverType: { type: String, required: true },
    imageCover: { type: [String, String], required: true },
    status: { type: String, enum: ['Còn hàng', 'Hết hàng'], required: true }
  }
)

BookInstantSchema
  .virtual('url')
  .get(function () {
    return '/bookinstant/' + this._id
  })

// Export model
module.exports = mongoose.model('BookInstant', BookInstantSchema)
