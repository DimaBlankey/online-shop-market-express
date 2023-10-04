import express from "express";
import cors from "cors";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import authRoute from "./6-routes/auth-routes";
import productsRoute from "./6-routes/products-routes";
import categoriesRoute from "./6-routes/categories-routes";
import userRoute from "./6-routes/user-routes";
import cartRoute from "./6-routes/cart-routes";
import orderRoute from "./6-routes/orders-routes";
import tokenRoute from "./6-routes/token-routes";
import reviewRoute from "./6-routes/reviews-routes";
import gptRoute from "./6-routes/gpt-routes";
import reportsRoute from "./6-routes/reports-routes";
import promotionsRoute from "./6-routes/promotion-routes";
import expressFileUpload from "express-fileupload";
import preventXss from "./3-middleware/prevent-xss";
import expressRateLimit from "express-rate-limit";
import promotionAutoService from "./5-services/promotion-auto-service";
import cron from 'node-cron';


const server = express();

// server.use(
//   expressRateLimit({
//     windowMs: 1000,
//     max: 100,
//   })
// );

server.use(
  cors({
    origin: "*",
  })
);
server.use(express.json());
server.use(preventXss);
server.use(expressFileUpload());
server.use("/api", authRoute);
server.use("/api", productsRoute);
server.use("/api", categoriesRoute);
server.use("/api", userRoute);
server.use("/api", cartRoute);
server.use("/api", orderRoute);
server.use("/api", tokenRoute);
server.use("/api", reviewRoute);
server.use("/api", gptRoute);
server.use("/api", reportsRoute);
server.use("/api", promotionsRoute);
server.use(routeNotFound);
server.use(catchAll);
promotionAutoService.dailyAutoPromotionService();
cron.schedule('0 0 * * *', async () => {
  await promotionAutoService.dailyAutoPromotionService();
});

console.log("TEST");

server.listen(appConfig.port, () =>
  console.log("Listening on http://localhost:" + appConfig.port)
);
