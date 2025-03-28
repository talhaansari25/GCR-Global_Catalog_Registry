import { v4 as uuidv4 } from "uuid";
import Product from "../models/Catalog.js";
import Seller from "../models/Seller.js";

export const viewProduct = async (req, res) => {
  try {
    // Extract the product ID from the request body
    const { id } = req.body;

    // Validate that the ID is provided
    if (!id) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    // Find the product by ID
    const product = await Product.findById(id);

    // If no product is found, return a 404 error
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Send a success response with the product details
    return res.status(200).json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Send an error response
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// GET API
export const getFilteredProducts = async (req, res) => {
  try {
    // Extract query parameters for filtering and pagination
    const {
      category,
      priceMin,
      priceMax,
      minAvailable,
      maxAvailable,
      brand,
      page = 1,
      limit = 5,
      recent ,
      sortAtoZ ,
    } = req.query;

    // Build a dynamic filter object
    const filters = {};

    // Handle category filtering
    if (category && category.toLowerCase() !== "all") {
      let categories = category.split(","); // Split comma-separated categories into an array
      categories = categories.slice(1);
      filters.category = { $in: categories }; // Use $in for multiple category filtering
    }

    if (brand) filters.brand = brand;

    if (priceMin || priceMax) {
      filters["dynamicFields.price"] = {};
      if (priceMin) filters["dynamicFields.price"].$gte = parseFloat(priceMin);
      if (priceMax) filters["dynamicFields.price"].$lte = parseFloat(priceMax);
    }

    if (minAvailable || maxAvailable) {
      filters["dynamicFields.availability"] = {};
      if (minAvailable) filters["dynamicFields.availability"].$gte = minAvailable;
      if (maxAvailable) filters["dynamicFields.availability"].$lte = maxAvailable;
    }

    // Pagination logic
    const pageNumber = parseInt(page);
    const pageLimit = parseInt(limit);
    const skip = (pageNumber - 1) * pageLimit;

    let sortOptions = {}; // Default is no sorting
    if (recent == 1) {
      // Sort by creation date (most recent first)
      sortOptions = { createdAt: -1 };
    } 
    if (sortAtoZ == 1) { 
      // Sort alphabetically by product name (ascending order)
      sortOptions = { productName: 1 };
    }

    // Fetch products from the database with filters and pagination
    const products = await Product.find(filters)
      .sort(sortOptions)
      .skip(skip) // Skip the previous pages' products
      .limit(pageLimit); // Limit to the specified number of products

    // Get the total count of products matching the filters
    const totalProducts = await Product.countDocuments(filters);

    // Respond with the filtered products and pagination details
    return res.status(200).json({
      message: "Filtered products retrieved successfully",
      totalProducts,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProducts / pageLimit),
      count: products.length,
      products,
    });
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Send an error response
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// export const searchProductByName = async (req, res) => {
//   try {
//     const { productName,sid } = req.body;

//     // Validate if the productName is provided
//     if (!productName) {
//       return res.status(400).json({
//         message: 'Product name is required to search',
//       });
//     }

//     const seller = await Seller.findById(sid);

//     if (!seller) {
//       return res.status(404).json({
//         message: "Seller not found",
//       });
//     }

//     // Get the productCatalog array (array of product IDs)
//     const productIds = seller.productCatalog;

//     if (!productIds || productIds.length === 0) {
//       return res.status(404).json({
//         message: 'No products found in the seller’s catalog',
//       });
//     }

//     // Perform a case-insensitive search for the product name and limit the result to 10
//     const products = await Product.find({
//       _id: { $in: productIds },
//       productName: { $regex: productName, $options: 'i' },  // $regex for case-insensitive search
//     })
//       .limit(10);  // Limit the result to top 10 matching products

//     // If no products are found, return a 404 error
//     if (products.length === 0) {
//       return res.status(404).json({
//         message: 'No products found matching the name',
//       });
//     }

//     // Respond with the found products
//     return res.status(200).json({
//       message: 'Top 10 matching products found successfully',
//       count: products.length,
//       products,
//     });
//   } catch (error) {
//     // Log the error for debugging
//     console.error(error);

//     // Send an error response
//     return res.status(500).json({
//       message: 'Internal Server Error',
//       error: error.message,
//     });
//   }
// };


export const searchProductByName = async (req, res) => {
  try {
    const { productName, sid } = req.body;

    // Validate if the productName is provided
    if (!productName) {
      return res.status(400).json({
        message: 'Product name is required to search',
      });
    }

    let productFilter = {
      productName: { $regex: productName, $options: 'i' }, // Case-insensitive search
    };

    // If sid is provided, restrict the search to the seller's productCatalog
    if (sid && sid.trim() !== '') {
      const seller = await Seller.findById(sid);

      if (!seller) {
        return res.status(404).json({
          message: 'Seller not found',
        });
      }

      const productIds = seller.productCatalog;

      if (!productIds || productIds.length === 0) {
        return res.status(404).json({
          message: 'No products in the seller\'s catalog',
        });
      }

      // Add productIds filter
      productFilter._id = { $in: productIds };
    }

    // Perform the search in the Product collection
    const products = await Product.find(productFilter).limit(10); // Limit to top 10 results

    // If no products are found, return a 404 error
    if (products.length === 0) {
      return res.status(404).json({
        message: 'No products found matching the name',
      });
    }

    // Respond with the found products
    return res.status(200).json({
      message: 'Top 10 matching products found successfully',
      count: products.length,
      products,
    });
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Send an error response
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
