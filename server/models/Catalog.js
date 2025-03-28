import mongoose from "mongoose";

// Define schema for a product
const productSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Product category (e.g., Electronics, Food)

  // Static fields (consistent across all categories)
  productName: { type: String, required: true },
  productuuid: { type: String, required: true },
  brand: { type: String, required: false },
  warranty: { type: String, required: false },
  model: { type: String, required: false },
  color: { type: String, required: false },
  img: { type: String, required: false },

  // Dynamic fields stored in an object that holds both price and availability
  dynamicFields: {
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Number,
      required: true,
    },
  },

  // Category-specific fields (additional dynamic fields per category)
  weight: { type: String, required: false }, // Used in categories like Food, Grocery
  ingredients: { type: String, required: false }, // Used in categories like Food, Health
  expiryDate: { type: Date, required: false }, // Used in Food, Health, Grocery
  size: { type: String, required: false }, // Used in Clothes, Sports
  material: { type: String, required: false }, // Used in Clothes, Kitchen, Sports
  ageGroup: { type: String, required: false }, // Used in Toys
  pages: { type: Number, required: false }, // Used in Books
  publisher: { type: String, required: false }, // Used in Books
  ISBN: { type: String, required: false }, // Used in Books
  skinType: { type: String, required: false }, // Used in Beauty
  applicationMethod: { type: String, required: false }, // Used in Beauty
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Convert UTC timestamps to IST when retrieving documents
productSchema.methods.convertTimestampsToIST = function() {
  const istOffset = 5.5 * 60; // IST is UTC +5:30
  if (this.createdAt) {
    this.createdAt = new Date(this.createdAt.getTime() + istOffset * 60000);
  }
  if (this.updatedAt) {
    this.updatedAt = new Date(this.updatedAt.getTime() + istOffset * 60000);
  }
};

const Product = mongoose.model("Product", productSchema);

export default Product;
