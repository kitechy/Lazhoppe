const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const shippingSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    courier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    items: [orderItemSchema],

    shipping: shippingSchema,

    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "GCash"],
      required: true,
    },

    subtotal: Number,

    deliveryFee: {
      type: Number,
      default: 50,
    },

    total: Number,

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Preparing",
        "Ready for Pickup",
        "Picked Up",
        "On the Way",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    pickedUpAt: {
      type: Date,
      default: null,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
