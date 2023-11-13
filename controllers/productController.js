import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";
import Review from "../models/review.js";
import User from "../models/user.js";
import { v4 as uuidV4 } from "uuid";

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

// GET /product/:id
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id)
      .populate("tags", "_id name")
      .populate("categories", "_id title");
    if (product.reviews.length > 0) {
      product = await product.populate("reviews");
      product = await product.populate("reviews.userID");
    }
    res
      .status(200)
      .json({ status: 200, message: "Get product success", product });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const options = [
  { sortQuery: "" },
  { sortQuery: "-quantitySale" },
  { sortQuery: "-createdAt" },
  { sortQuery: "cost" },
  { sortQuery: "-cost" },
];

// GET /product/
const getFilterProduct = async (req, res) => {
  try {
    const { category, tag, minPrice, maxPrice, sort } = req.query;
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
    let newSort = 0;
    if (sort) newSort = sort;

    const filteredProducts = await Product.find(query)
      .select("-quantity -tags -reviews -categories")
      .sort(options[newSort].sortQuery);

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

// POST /product/review
const createReview = async (req, res) => {
  try {
    const { userID, productID, rating, review, name, email } = req.body;

    let newUser;
    if (!userID) {
      const anomyousUser = await User.create({
        username: name,
        email,
        password: uuidV4(),
      });
      newUser = anomyousUser;
    }

    const newReview = await Review.create({
      userID: userID ? userID : newUser._id,
      rating,
      review,
    });
    const resReview = await newReview.populate("userID");

    const updateProduct = await Product.findById(productID);
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      {
        reviews: [...updateProduct.reviews, newReview._id],
      },
      { new: true }
    );
    res.status(201).json({
      status: 201,
      message: "Create review success",
      review: resReview,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export {
  createProduct,
  getMinMaxPrice,
  getProduct,
  getFilterProduct,
  createReview,
};
