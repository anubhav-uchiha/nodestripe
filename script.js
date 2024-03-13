const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { connectDB } = require("./config/db.js");
const customerRouter = require("./routes/customerRouter.js");
const productRouter = require("./routes/stripeProductRoute.js");

dotenv.config();

connectDB();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node code",
      description: "My all Node code",
    },
    servers: [
      {
        url: "http://localhost:4040",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerJsdoc(options);

const app = express();
app.use(cors());
app.use(express.json());
// connect DB

//Main route
app.get("/", (req, res) => {
  res.send("API is running....");
});

//other routes
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/product", productRouter);

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
