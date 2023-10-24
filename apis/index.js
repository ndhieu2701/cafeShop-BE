import userRoute from "./user.js";
import categoryRoute from "./category.js"
import tagRoute from "./tag.js"

const route = (app) => {
  app.use("/user", userRoute);
  app.use("/categories", categoryRoute)
  app.use("/tags", tagRoute)
};

export default route;
