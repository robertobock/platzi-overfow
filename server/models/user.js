import mongoose, {Schema} from 'mongoose'
import uniqueValidaror from 'mongoose-unique-validator'

const UserSchema = Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, reuired: true}
})
UserSchema.plugin(uniqueValidaror)
export default mongoose.model('User', UserSchema)
