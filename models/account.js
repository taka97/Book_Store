var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema

var AccountSchema = new Schema(
  {
    email: {type: String, require: true},
    verifyEmail: {type: Boolean, require: true},
    password: {type: String, require: true},
    avatarPath: {type: String, require: true},
    name: {type: String, require: true},
    birthDate: {type: Date, require: true},
    gender: {type: String, enum: ['Nam', 'Nữ'], require: true},
    address: {type: String, require: true},
    typeAccount: {type: String, enum: ['Admin', 'User'], require: true},
    isBlock: {type: Boolean, require: true}
  }
)

AccountSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

AccountSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

AccountSchema
  .virtual('url')
  .get(function () {
    return '/account/' + this._id
  })

// Export model
module.exports = mongoose.model('Account', AccountSchema)
