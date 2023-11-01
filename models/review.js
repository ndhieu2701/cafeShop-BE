import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
