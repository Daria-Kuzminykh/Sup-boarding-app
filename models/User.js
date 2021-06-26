const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  loginName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
	name: {type: String, required: true},
	surname: {type: String, required: true},
  supRoutes: [{ type: Types.ObjectId, ref: 'SupRoute' }],
  events: [{ type: Types.ObjectId, ref: 'Event' }]
})

module.exports = model('User', schema);