const { model, Schema, Types } = require('mongoose');

module.exports = model(
  'Article',
  new Schema(
    {
      title: { type: String, required: [true, 'Title is mandatory!'] },
      body: { type: String, required: [true, 'Body is mandatory!'] },
      cover: String,
      status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: 1,
      },
    },
    { timestamps: true, id: true }
  )
);
