import Tag from "../models/tag.js";

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res
      .status(200)
      .json({ status: 200, message: "Get all tags success!", tags });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export { getAllTags };
