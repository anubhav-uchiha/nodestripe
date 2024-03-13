const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  line1: { type: String, required: true },
  line2: { type: String, required: false },
  postal_code: { type: String, required: true },
  state: { type: String, required: true },
});

const shippingSchema = new mongoose.Schema({
  address: addressSchema,
  name: { type: String, required: true },
  phone: { type: String, required: false },
});

const discountSchema = new mongoose.Schema({
  invoice_credit_balance: { type: Map, of: Number },
});

const invoiceSettingsSchema = new mongoose.Schema({
  custom_fields: { type: Map, of: String },
  default_payment_method: { type: String, required: false },
  footer: { type: String, required: false },
  rendering_options: { type: Map, of: String },
});

const stripeCustomerSchema = new mongoose.Schema({
  object: { type: String, required: false },
  address: { type: addressSchema, required: true },
  balance: { type: Number, required: false },
  created: { type: Number, required: true },
  currency: { type: String, required: false },
  default_source: { type: String, required: false },
  delinquent: { type: Boolean, required: true, default: false },
  description: { type: String, required: false },
  discount: discountSchema,
  email: { type: String, required: true },
  invoice_prefix: { type: String, required: false },
  invoice_settings: invoiceSettingsSchema,
  livemode: { type: Boolean, required: true, default: false },
  metadata: { type: Map, of: mongoose.Schema.Types.Mixed },
  name: { type: String, required: true },
  next_invoice_sequence: { type: Number, required: false },
  phone: { type: String, required: true },
  preferred_locales: { type: [String], required: false },
  shipping: shippingSchema,
  tax_exempt: {
    type: String,
    enum: ["none", "exempt", "reverse"],
    required: true,
    default: "none",
  },
  test_clock: { type: String, required: false },
});

const StripeCustomer = mongoose.model("StripeCustomer", stripeCustomerSchema);

module.exports = StripeCustomer;
