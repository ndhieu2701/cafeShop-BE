import userRoute from "./user.js";
import categoryRoute from "./category.js"
import tagRoute from "./tag.js"
import productRoute from "./product.js"

const route = (app) => {
  app.use("/user", userRoute);
  app.use("/categories", categoryRoute)
  app.use("/tags", tagRoute)
  app.use("/product", productRoute)
};

export default route;
