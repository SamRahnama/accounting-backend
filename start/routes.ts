import Route from '@ioc:Adonis/Core/Route'
import userRoutes from "./user"
import roleRoutes from "./role"
import productRoutes from "./product"
import paymentRoutes from "./payment"
import orderRoutes from "./order"
import categoryRoutes from "./category"
import brandRoutes from "./brand"
import loanRoutes from "./loan"
import authRoutes from "./auth"
import storeRoutes from "./routes/stores"

import AutoSwagger from "adonis-autoswagger";
import swagger from "Config/swagger";

Route.group(() => {
  Route.group(() => {
    userRoutes()
    roleRoutes()
    paymentRoutes()
    productRoutes()
    orderRoutes()
    categoryRoutes()
    brandRoutes()
    loanRoutes()
    storeRoutes()
  }).middleware('auth')
  authRoutes()
}).prefix('/api/v1').as('api.v1')

Route.get("/swagger", async () => {
  return AutoSwagger.docs(Route.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
Route.get("/docs", async () => {
  return AutoSwagger.ui("/swagger");
});
