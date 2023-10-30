import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";

//POST /product
const createProduct = async (req, res, next) => {
  try {
    const { name, cost, description, quantity, tags, categories } = req.body;
    const image = req.file;
    // upload image to cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "auto",
    });
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
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

//GET /product/price
const getMinMaxPrice = async (req, res) => {
  try {
    const maxPriceProduct = await Product.findOne().sort("-cost");
    const minPriceProduct = await Product.findOne().sort("cost");
    res.status(200).json({
      status: 200,
      min: minPriceProduct.cost,
      max: maxPriceProduct.cost,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// GET /product
const getAllProduct = async (req, res) => {
  // try {
  //   const allProduct = await Product.find()
  //     .select("-quantity -tags -reviews -categories")
  //     .sort();
  //   res.status(200).json({ status: 200, products: allProduct });
  // } catch (error) {
  //   res.status(500).json({ status: 500, message: error.message });
  // }
};

// GET /product/
const getFilterProduct = async (req, res) => {
  try {
    const { category, tag, minPrice, maxPrice } = req.query;
    let query = {};
    if (category) query.categories = { $in: [category] };
    if (tag) query.tags = { $in: [tag] };

    let costQuery = {};
    if (minPrice !== undefined) {
      costQuery.$gte = minPrice;
    }
    if (maxPrice !== undefined) {
      costQuery.$lte = maxPrice;
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.cost = costQuery;
    }

    const filteredProducts = await Product.find(query)
      .select("-quantity -tags -reviews -categories")
      .sort();

    const result = await Product.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          minCost: { $min: "$cost" },
          maxCost: { $max: "$cost" },
        },
      },
    ]);

    res.status(200).json({
      status: 200,
      products: filteredProducts,
      minPrice: result[0].minCost,
      maxPrice: result[0].maxCost,
      message: "Get filtered products success",
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export { createProduct, getMinMaxPrice, getAllProduct, getFilterProduct };
