const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  name: {type: String, required: true},
  place: {type: String, required: true},
  dateEvent: {type: String, required: true},
  owner: {type: Types.ObjectId, ref: 'User'},
	ownerFullName: {type: String, required: true},
  contacts: {type: String, required: true},
  contactTel: {type: Number},
	descr: {type: String},
	clicks: {type: Number, required: true},
});

module.exports = model('Event', schema);