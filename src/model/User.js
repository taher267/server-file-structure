const { model, Schema } = require('mongoose');

module.exports = model(
  'User',
  new Schema(
    {
      name: {
        type: String,
        required: [true, 'Name is mandatory!'],
        minLength: [5, 'Name at least 5 characters'],
        maxLength: [50, 'Name maximum 50 characters'],
      },
      email: {
        type: String,
        required: [true, 'Email is mandatory!'],
        unique: [true, 'Email already exist'],
        index: 1,
      },
      password: String,
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'declined', 'blocked'],
        default: 'pending',
      },
    },
    { timestamps: true, id: true, strict: false }
  )
);
