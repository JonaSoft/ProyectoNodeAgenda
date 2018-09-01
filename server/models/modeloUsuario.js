const mongoose = require('mongoose');

const Schema = mongoose.Schema

let UserSchema = new Schema({
  id: { type: Number, required: true, unique: true},
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique:true},
  psw: { type: String, required: true}
}, 
  { collection : 'usuarios' })
let UserModel = mongoose.model('usuarios', UserSchema)

module.exports = UserModel
