import Category from "../models/category.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: 200,
      message: "Get all categories success!",
      categories,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export { getAllCategories };
