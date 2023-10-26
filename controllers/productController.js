import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, cost, description, quantity, tags, categories } = req.body;
    const image = req.file
    // upload image to cloudinary
    cloudinary.uploader
      .upload(image.path, {
        resource_type: "auto",
      })
      .then(async (result) => {
        const imageUrl = result.secure_url;
        const product = await Product.create({
          name,
          cost,
          description,
          quantity,
          tags,
          categories,
          image: imageUrl,
        });
        return res
          .status(201)
          .json({ status: 201, message: "Added new product success!" });
      })
      .catch((error) =>
        res.status(500).json({ status: 500, message: error.message })
      );
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export { createProduct };
