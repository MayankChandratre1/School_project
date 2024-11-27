import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['SystemAdmin'], default: 'SystemAdmin' },
    createdAt: { type: Date, default: Date.now },
});



export default mongoose.model('Admin', adminSchema);