import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  generateToken: () => string;
  checkPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: true,
    set: (value: string) => bcrypt.hashSync(value, bcrypt.genSaltSync(12))
  },
  role: { type: String, required: true }
});

userSchema.methods.generateToken = function (): string {
  return jwt.sign({ id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '30d' });
};

userSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>('Admin', userSchema);

export default User;
