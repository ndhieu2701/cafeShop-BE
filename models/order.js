import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantityItem: {
        type: Number,
        required: true,
      },
    },
  ],
  delivery: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "canceled"],
    default: "pending",
  },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
