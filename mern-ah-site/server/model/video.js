import mongoose, { Schema } from "mongoose";

const videoModel =
  mongoose.models.video ||
  mongoose.model(
    `video`,
    new Schema(
      {
        title: String,
        description: String,
        thumbnail_url: String,
        video_url: String,
        video_upload_url: String,
        code: String,
        producers: [String],
        keywords: [String],
        category: [String],
        idos: [
          {
            type: Schema.Types.ObjectId,
            ref: "idol",
          },
        ],
        duration: String,

        view_count: { type: Number, default: 0 },
        like_count: { type: Number, default: 0 },
        dislike_count: { type: Number, default: 0 },
      },
      {
        timestamps: true,
      }
    )
  );
export default videoModel;
