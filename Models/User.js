const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true,
    },
    lastName: {
        type: String,
        required: true,
        index: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['Traveller', 'Guide', 'Hotel', 'Admin'],
        default: 'Traveller',
        required: true,
    },
    specifics: {
        type: ObjectId,
        refPath: 'role',
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (
    typed_password,
    user_password
) {
    return await bcryptjs.compare(typed_password, user_password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
