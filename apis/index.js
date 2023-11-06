import userRoute from "./user.js";
import categoryRoute from "./category.js"
import tagRoute from "./tag.js"
import productRoute from "./product.js"
import orderRoute from "./order.js"
import cartRoute from "./cart.js"

const route = (app) => {
  app.use("/user", userRoute);
  app.use("/categories", categoryRoute)
  app.use("/tags", tagRoute)
  app.use("/product", productRoute)
  app.use("/order", orderRoute)
  app.use("/cart", cartRoute)
};

export default route;
