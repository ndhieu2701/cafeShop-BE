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
  payment: {
    id: String,
    method: {
      type: String,
      enum: ['shipcode', 'paypal'],
      default: 'shipcode'
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    }
  },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
