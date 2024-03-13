const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  active: { type: Boolean, default: true, required: true },
  description: { type: String, required: true },

  metadata: { type: Object },
  default_price_data: {
    currency: { type: String, required: true },
    currency_options: {
      custom_unit_amount: {
        enabled: { type: Boolean },
        maximum: { type: Number },
        minimum: { type: Number },
        preset: { type: Number },
      },
      tax_behavior: {
        type: String,
        enum: ["inclusive", "exclusive", "unspecified"],
      },
      tiers: [
        {
          up_to: { type: String | Number, required: false },
          flat_amount: { type: Number },
          flat_amount_decimal: { type: String },
          unit_amount: { type: Number },
          unit_amount_decimal: { type: String },
        },
      ],
      unit_amount: { type: Number, required: false },
      unit_amount_decimal: { type: String, required: false },
    },
    recurring: {
      interval: {
        type: String,
        required: false,
        enum: ["day", "week", "month", "year"],
      },
      interval_count: { type: Number },
    },
    tax_behavior: {
      type: String,
      enum: ["inclusive", "exclusive", "unspecified"],
    },
    unit_amount: { type: Number },
    unit_amount_decimal: { type: String },
  },
  features: [
    {
      name: { type: String, required: false },
    },
  ],
  images: [{ type: String }],
  package_dimensions: {
    height: { type: Number, required: false },
    length: { type: Number, required: false },
    weight: { type: Number, required: false },
    width: { type: Number, required: false },
  },
  shippable: { type: Boolean },
  statement_descriptor: { type: String },
  tax_code: { type: String },
  unit_label: { type: String },
  url: { type: String },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
