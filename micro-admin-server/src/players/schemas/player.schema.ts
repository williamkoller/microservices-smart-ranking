import * as monsoose from 'mongoose'

export const PlayerSchema = new monsoose.Schema(
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
      type: String,
    },
    imgUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'players',
  },
)
