import * as monsoose from 'mongoose'

export const PlayerSchema = new monsoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    tel: String,
    ranking: String,
    rankingPosition: String,
    imgUrl: String,
    category: {
      type: monsoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    timestamps: true,
    collection: 'players',
  },
)
