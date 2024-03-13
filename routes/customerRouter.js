const express = require("express");
const {
  createCustomer,
  updateCustomer,
  getCustomerById,
  getAllCustomers,
  deleteCustomer,
  searchCustomers,
} = require("../controllers/customer.js");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *         country:
 *           type: string
 *         line1:
 *           type: string
 *         line2:
 *           type: string
 *         postal_code:
 *           type: string
 *         state:
 *           type: string
 *
 *     Shipping:
 *       type: object
 *       properties:
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *
 *     Discount:
 *       type: object
 *       properties:
 *         invoice_credit_balance:
 *           type: object
 *
 *     InvoiceSettings:
 *       type: object
 *       properties:
 *         custom_fields:
 *           type: object
 *         default_payment_method:
 *           type: string
 *         footer:
 *           type: string
 *         rendering_options:
 *           type: object
 *
 *     StripeCustomer:
 *       type: object
 *       properties:
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         balance:
 *           type: number
 *         currency:
 *           type: string
 *         default_source:
 *           type: string
 *         description:
 *           type: string
 *         discount:
 *           $ref: '#/components/schemas/Discount'
 *         email:
 *           type: string
 *         invoice_prefix:
 *           type: string
 *         invoice_settings:
 *           $ref: '#/components/schemas/InvoiceSettings'
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         preferred_locales:
 *           type: array
 *           items:
 *             type: string
 *         shipping:
 *           $ref: '#/components/schemas/Shipping'
 *         tax_exempt:
 *           type: string
 *           enum: [ 'none', 'exempt', 'reverse' ]
 *         test_clock:
 *           type: string
 *
 *
 * tags:
 *   name: Stripe Customer
 *   description: APIs for managing Stripe customers
 */

/**
 * @swagger
 * /api/v1/customer/:
 *   post:
 *     summary: Create a new Stripe customer
 *     tags: [Stripe Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StripeCustomer'
 *     responses:
 *       '200':
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StripeCustomer'
 *       '500':
 *         description: Internal Server Error
 */

router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.get("/:id", getCustomerById);
router.get("/", getAllCustomers);
router.delete("/:id", deleteCustomer);
router.get("/search", searchCustomers);

module.exports = router;
