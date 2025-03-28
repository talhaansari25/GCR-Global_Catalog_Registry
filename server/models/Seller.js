import mongoose from "mongoose";

// Schema for the business address
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

// Schema for orders made to the seller
const orderSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer", required: true },
  },
  { _id: false }
);

// Main Seller Schema
const sellerSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Ensure password is hashed before saving
    contactNumber: { type: String, required: true },
    businessAddress: { type: addressSchema, required: true },
    taxId: { type: String, required: true, unique: true },
    productCatalog: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Array of Product IDs only
    orderHistory: [orderSchema], // Array to hold orders made to the seller
    sellerRating: { type: Number, default: 5 }, // Seller rating (out of 5)
    totalSales: { type: Number, default: 0 }, // Total sales for the seller
    status: { type: String, required: true, enum: ["active", "inactive", "suspended"] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Optional method to convert timestamps to IST
sellerSchema.methods.convertTimestampsToIST = function () {
    const istOffset = 5.5 * 60; // IST is UTC +5:30
    if (this.createdAt) {
      this.createdAt = new Date(this.createdAt.getTime() + istOffset * 60000);
    }
    if (this.updatedAt) {
      this.updatedAt = new Date(this.updatedAt.getTime() + istOffset * 60000);
    }
  };

// Model for Seller
const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
