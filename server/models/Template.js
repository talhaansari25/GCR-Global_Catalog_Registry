import mongoose from "mongoose";

// Define the schema for fields
const fieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    required: { type: Boolean, required: true },
    label: { type: String, required: true },
    default: { type: String },
  },
  { _id: false }
);

// Main schema for templates
const tempScheme = new mongoose.Schema(
  {
    category: { type: String, required: true },
    fields: { type: [fieldSchema], required: true },
  },
  {
    timestamps: true,
  }
);

// Optional method to convert timestamps to IST
tempScheme.methods.convertTimestampsToIST = function () {
  const istOffset = 5.5 * 60; // IST is UTC +5:30
  if (this.createdAt) {
    this.createdAt = new Date(this.createdAt.getTime() + istOffset * 60000);
  }
  if (this.updatedAt) {
    this.updatedAt = new Date(this.updatedAt.getTime() + istOffset * 60000);
  }
};

const Template = mongoose.model("Template", tempScheme);

export default Template;
