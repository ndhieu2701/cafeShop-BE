import paypal from "paypal-rest-sdk";
import config from "./config";

paypal.configure({
  mode: config.paypalMode,
  client_id: config.paypalClientID,
  client_secret: config.paypalSecret,
});

export default paypal