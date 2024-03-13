const dotenv = require("dotenv");
const StripeCustomer = require("../models/customerModel");
const stripe = require("stripe")(
  "sk_test_51Opps5SD6C2fv6FPYwIp94Wz0Vu9NNSgfbh25VBfWS96ugfI8xOqfnIVO2qICnpQlYvnv8w7kFGEL5q9HeQ8yW9I00atEmrLtw"
);

dotenv.config();

console.log(process.env.STRIPE_SECRET_KEY);

const createProduct = async (req, res) => {
  try {
    const {} = req.body;

    const customer = await stripe.customers.create({});

    const newCustomer = new StripeCustomer({});

    await newCustomer.save();

    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
};
