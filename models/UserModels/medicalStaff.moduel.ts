import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IMedicalStaff extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  department: string;
  generateToken: () => string;
  checkPassword: (password: string) => Promise<boolean>;
}

const medicalStaffSchema = new Schema<IMedicalStaff>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    set: (value: string) => bcrypt.hashSync(value, bcrypt.genSaltSync(12))
  },
  role: { type: String, required: true },
  department: { type: String, required: true }
});

medicalStaffSchema.methods.generateToken = function (): string {
  return jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '30d' }
  );
};

medicalStaffSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const MedicalStaff: Model<IMedicalStaff> = mongoose.model<IMedicalStaff>('MedicalStaff', medicalStaffSchema);

export default MedicalStaff;
