import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Student', studentSchema);
