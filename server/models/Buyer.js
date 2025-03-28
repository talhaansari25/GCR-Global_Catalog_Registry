import mongoose from "mongoose";

// Schema for shipping address
const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { _id: false }
);

// Main Buyer Schema
const buyerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Use bcrypt to hash password before saving
    phoneNumber: { type: String, required: true },
    shippingAddress: { type: addressSchema, required: true },
    billingAddress: { type: addressSchema }, // Optional, as it may be same as shipping address
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Store orders as an array of order objects
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Wishlist (product references)
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Cart (product references)
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Optional method to convert timestamps to IST
buyerSchema.methods.convertTimestampsToIST = function () {
  const istOffset = 5.5 * 60; // IST is UTC +5:30
  if (this.createdAt) {
    this.createdAt = new Date(this.createdAt.getTime() + istOffset * 60000);
  }
  if (this.updatedAt) {
    this.updatedAt = new Date(this.updatedAt.getTime() + istOffset * 60000);
  }
};

// Model for Buyer
const Buyer = mongoose.model("Buyer", buyerSchema);

export default Buyer;
