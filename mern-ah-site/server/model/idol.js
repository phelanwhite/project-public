import mongoose, { Schema } from "mongoose";

const idolModel =
  mongoose.models.idol ||
  mongoose.model(
    `idol`,
    new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        nationality: String,
        other_name: [String],
        avatar_url: String,
        age: String,
        dob: String,
        measurements: String,
        cup: String,
        height: String,

        debut_at: String,
        retire: String,
        active_status: {
          type: Boolean,
          default: true,
        },
        keywords: [String],

        view_count: { type: Number, default: 0 },
        like_count: { type: Number, default: 0 },
        dislike_count: { type: Number, default: 0 },
      },
      {
        timestamps: true,
      }
    )
  );
export default idolModel;
