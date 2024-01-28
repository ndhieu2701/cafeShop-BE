import Order from "../models/order.js";
import User from "../models/user.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import { v4 as uuidV4 } from "uuid";
import { filterProductByID } from "../function/filterProductByID.js";
// POST /order/create
const createOrder = async (req, res) => {
  try {
    const { userID, cartID, fullname, address, products, phoneNumber, totalPrice, payment } =
      req.body;

    let newUser;
    if (!cartID) {
      const anonymous = uuidV4();
      const userAnonymous = await User.create({
        address,
        email: `anonymous.${anonymous}@gmail.com`,
        password: anonymous,
        isAdmin: false,
        phoneNumber,
        username: fullname,
      });
      newUser = userAnonymous;
    }

    const newOrder = await Order.create({
      user: cartID ? userID : newUser?._id,
      delivery: address,
      products,
      totalPrice,
      payment,
    });

    const update = await products.map(async (product) => {
      const updateProduct = await Product.findById(product.product);
      const updatedProduct = await Product.findByIdAndUpdate(product.product, {
        quantity: updateProduct.quantity - product.quantityItem,
        quantitySale: updateProduct.quantitySale + product.quantityItem,
      });
    });

    if (cartID && userID) {
      const updateCart = await Cart.findById(cartID);
      const productIDs = products.map((product) => product.product);
      const updatedCart = await Cart.findByIdAndUpdate(cartID, {
        products: filterProductByID(updateCart.products, productIDs),
      });
    }
    res
      .status(201)
      .json({ status: 201, message: "Create order success", newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export { createOrder };
