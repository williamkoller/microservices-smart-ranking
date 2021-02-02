import { Schema } from 'mongoose'

export const PlayerModel = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    tel: {
      type: String,
    },
    ranking: {
      type: String,
    },
    rankingPosition: {
      type: Number,
    },
    imgUrl: {
      type: String,
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    timestamps: true,
    collection: 'players',
  },
)
