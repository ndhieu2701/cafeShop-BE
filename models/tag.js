import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", TagSchema);
// const tags = [
//   {name: "coffee bean"},
//   {name: "coffee grinder"},
//   {name: "coffee maker"},
//   {name: "coffee powder"},
//   {name: "espresso"}
// ]

// Tag.insertMany(tags)
export default Tag;
