var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PublisherSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100}
  }
)

PublisherSchema
  .virtual('url')
  .get(function () {
    return '/publisher/' + this._id
  })

// Export model
module.exports = mongoose.model('Publisher', PublisherSchema)
