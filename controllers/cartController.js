import Cart from "../models/cart.js";

// PUT /cart/update
const updateCart = async (req, res) => {
  try {
    const { userID, products } = req.body;
    const updateCart = await Cart.findOneAndUpdate(
      { user: userID },
      {
        products,
      },
      { new: true }
    ).populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    return res
      .status(201)
      .json({ status: 201, message: "Update cart success!", cart: updateCart });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// GET /cart
const getUserCart = async (req, res) => {
  try {
    const { userID } = req.query;
    if (userID) {
      const userCart = await Cart.findOne({ user: userID }).populate({
        path: "products",
        populate: {
          path: "product",
          model: "Product",
        },
      });
      if (!userCart) {
        const newCart = await Cart.create({ user: userID, products: [] });
        return res.status(200).json({
          status: 200,
          message: "Get user cart success",
          cart: newCart,
        });
      } else
        return res.status(200).json({
          status: 200,
          message: "Get user cart success",
          cart: userCart,
        });
    } else
      return res
        .status(200)
        .json({ status: 200, message: "Get user cart success", cart: [] });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export { updateCart, getUserCart };
