const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  region: {type: String, required: true},
  place: {type: String, required: true},
  name: {type: String, required: true},
  cover: {type: String},
	coverChoice: {type: Number, required: true},
  level: {type: Number, required: true},
  time: {type: Number, required: true},
  owner: {type: Types.ObjectId, ref: 'User'},
	ownerFullName: {type: String, required: true},
  fotoLink: {type: String},
	coordinatesLink: {type: String},
	stravaLink: {type: String},
  descr: {type: String},
  plus: {type: String},
  minus: {type: String},
  date: {type: String, required: true},
  clicks: {type: Number, default: 0},
})

module.exports = model('SupRoute', schema);