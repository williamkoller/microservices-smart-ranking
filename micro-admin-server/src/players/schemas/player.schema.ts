import * as mongoose from 'mongoose'

export const PlayerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    ranking: {
      type: String,
    },
    rankingPosition: {
      type: Number,
    },
    urlPhotoPlayer: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'players',
  },
)
