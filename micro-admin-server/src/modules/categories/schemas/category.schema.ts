import * as mongoose from 'mongoose'

export const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    events: [
      {
        name: {
          type: String,
        },
        operation: {
          type: String,
        },
        value: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'categories',
  },
)
