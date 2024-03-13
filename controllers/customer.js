const dotenv = require("dotenv");
const StripeCustomer = require("../models/customerModel");
const stripe = require("stripe")(
  "sk_test_51Opps5SD6C2fv6FPYwIp94Wz0Vu9NNSgfbh25VBfWS96ugfI8xOqfnIVO2qICnpQlYvnv8w7kFGEL5q9HeQ8yW9I00atEmrLtw"
);

dotenv.config();

console.log(process.env.STRIPE_SECRET_KEY);
// Create a customer
const createCustomer = async (req, res) => {
  try {
    const { address, email, name, phone } = req.body;

    const customer = await stripe.customers.create({
      name,
      email,
      phone,
      address: {
        city: address.city,
        country: address.country,
        line1: address.line1,
        postal_code: address.postal_code,
        state: address.state,
      },
    });

    const newCustomer = new StripeCustomer({
      object: customer.object,
      address: {
        city: address.city,
        country: address.country,
        line1: address.line1,
        postal_code: address.postal_code,
        state: address.state,
      },
      created: customer.created,
      delinquent: customer.delinquent,
      email: customer.email,
      livemode: customer.livemode,
      metadata: customer.metadata,
      name: customer.name,
      phone: customer.phone,
    });

    await newCustomer.save();

    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const updateData = req.body;

    const customer = await stripe.customers.update(customerId, updateData);

    // Update the customer in the database
    const updatedCustomer = await StripeCustomer.findOneAndUpdate(
      { _id: customerId },
      updateData,
      { new: true }
    );

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await stripe.customers.retrieve(customerId);
    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await stripe.customers.list();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    const deletedCustomer = await stripe.customers.del(customerId);

    res
      .status(200)
      .json({ message: "Customer deleted successfully", deletedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const searchCustomers = async (req, res) => {
  try {
    const { query, limit = 10, page } = req.query;

    const searchOptions = {
      query,
      limit: parseInt(limit),
      page,
    };

    const customers = await stripe.customers.search(searchOptions);

    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createCustomer,
  updateCustomer,
  getCustomerById,
  getAllCustomers,
  deleteCustomer,
  searchCustomers,
};
