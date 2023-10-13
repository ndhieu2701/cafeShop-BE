import userRoute from "./user.js";

const route = (app) => {
  app.use("/user", userRoute);
};

export default route;
