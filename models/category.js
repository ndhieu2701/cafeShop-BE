import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

// const categories = [
//   {title: "Coffee Cups & Mugs"},
//   {title: "Coffee, Tea & Espresso"},
//   {title: "Condiment Pots"},
//   {title: "Glassware & Drinkware"},
//   {title: "Novelty Coffee Mugs"},
//   {title: "Swizzle Sticks"}
// ]

// Category.insertMany(categories)
export default Category;
