import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

userSchema.methods.encryptPassword = async (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validatePassword = async (password: string) => {
  return bcrypt.compareSync(password, password);
};

export default mongoose.model('User', userSchema);
