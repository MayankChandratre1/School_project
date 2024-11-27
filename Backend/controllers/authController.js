import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import School from '../models/School.js';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


export const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user;
        switch (role) {
            case 'SystemAdmin':
                user = await Admin.findOne({ email });
                break;
            case 'School':
                user = await School.findOne({ email });
                break;
            case 'Teacher':
                user = await Teacher.findOne({ email });
                break;
            case 'Student':
                user = await Student.findOne({ email });
                break;
            default:
                return res.status(400).json({ message: 'Invalid Role' });
        }

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid Credentials' });

        const token = generateToken(user._id, role);
        res.status(200).json({ token, role, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        let newUser;
        switch (role) {
            case 'SystemAdmin':
                newUser = new Admin({ name, email, password: hashedPassword });
                break;
            case 'School':
                newUser = new School({ name, email, password: hashedPassword });
                break;
            case 'Teacher':
                newUser = new Teacher({ name, email, password: hashedPassword });
                break;
            case 'Student':
                newUser = new Student({ name, email, password: hashedPassword });
                break;
            default:
                return res.status(400).json({ message: 'Invalid Role' });
        }

        const savedUser = await newUser.save();
        const token = generateToken(savedUser._id, role);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: savedUser._id, name: savedUser.name, email: savedUser.email, role },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
