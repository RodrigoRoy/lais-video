import mongoose from 'mongoose';
import {StringUtil} from '../utilities/string-util';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {type: String, minlength: 3, maxlength: 30, trim: true, required: true, index: {unique: true}},
  fullname: {type: String, minlength: 3, maxlength: 50, trim: true, required: true},
  email: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true, select: false},
  admin: {type: Boolean, default: false}
});
userSchema.set('timestamps', true);
// userSchema.virtual('fullname').get(function(){
//   const first = StringUtil.capitalize(this.first.toLowerCase());
//   const last = StringUtil.capitalize(this.last.toLowerCase());
//   return `${first} ${last}`;
// });
userSchema.statics.passwordMatches = function(password, hash){
  return bcrypt.compareSync(password, hash);
}
userSchema.pre('save', function(next){
  this.username = this.username.toLowerCase();
  // this.fisrt = this.first.toLowerCase();
  // this.last = this.last.toLowerCase();
  const unsafePassword = this.password;
  this.password = bcrypt.hashSync(unsafePassword);
  next();
});

export default mongoose.model('user', userSchema);
