import { v4 as uuidv4 } from "uuid";
import Product from "../models/Catalog.js";
import multer from 'multer';
import csvParser from 'csv-parser';
import xlsx from 'xlsx';
import fs from 'fs';
import Template from '../models/Template.js'
import Seller from '../models/Seller.js'

export const registerSeller = async (req, res) => {
  const { businessName, email, password, contactNumber, businessAddress, taxId } = req.body;

  try {
    // Check if the email already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Create a new seller
    const newSeller = new Seller({
      businessName,
      email,
      password, // Storing password directly (not secure)
      contactNumber,
      businessAddress,
      taxId,
      status: "active", // Default status
    });

    await newSeller.save();

    res.status(201).json({ message: "Seller registered successfully.", seller: newSeller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Login seller
export const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the seller exists
    const seller = await Seller.findOne({ email });
    if (!seller || seller.password !== password) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Respond with seller details on successful login
    res.status(200).json({ message: "Login successful.", seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// export const addProduct = async (req, res) => {
//   try {
//     // Extract necessary fields from the request body
//     const {
//       category,
//       productName,
//       brand,
//       warranty,
//       model,
//       color,
//       img,
//       dynamicFields,
//       weight,
//       ingredients,
//       expiryDate,
//       size,
//       material,
//       ageGroup,
//       pages,
//       publisher,
//       ISBN,
//       skinType,
//       applicationMethod,
//       sid
//     } = req.body;

//     // Validate required fields
//     if (
//       !productName ||
//       !category ||
//       !dynamicFields?.price ||
//       !dynamicFields?.availability
//     ) {
//       return res.status(400).json({
//         message:
//           "Missing required fields: productName, category, price, or availability",
//       });
//     }

//     // Generate a unique UUID for the product
//     const productuuid = uuidv4();

//     // Construct the product object
//     const productData = {
//       category,
//       productuuid,
//       productName,
//       brand,
//       warranty,
//       model,
//       color,
//       img,
//       dynamicFields,
//       weight,
//       ingredients,
//       expiryDate,
//       size,
//       material,
//       ageGroup,
//       pages,
//       publisher,
//       ISBN,
//       skinType,
//       applicationMethod,
//     };

//     // Remove null or undefined fields from the product object
//     Object.keys(productData).forEach((key) => {
//       if (productData[key] == null) delete productData[key];
//     });

//     // Create a new Product instance
//     const product = new Product(productData);

//     // Save the product to the database
//     await product.save();

//     // Send a success response
//     return res.status(201).json({
//       message: "Product added successfully",
//       product,
//     });
//   } catch (error) {
//     // Log the error for debugging
//     console.error(error);

//     // Send an error response
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

export const addProduct = async (req, res) => {
  try {
    // Extract necessary fields from the request body
    const {
      category,
      productName,
      brand,
      warranty,
      model,
      color,
      img,
      dynamicFields,
      weight,
      ingredients,
      expiryDate,
      size,
      material,
      ageGroup,
      pages,
      publisher,
      ISBN,
      skinType,
      applicationMethod,
      sid, // Seller ID
    } = req.body;

    // Validate required fields
    if (
      !productName ||
      !category ||
      !dynamicFields?.price ||
      !dynamicFields?.availability ||
      !sid // Ensure seller ID is provided
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: productName, category, price, availability, or seller ID",
      });
    }

    // Check if the seller exists
    const seller = await Seller.findById(sid);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found." });
    }

    // Generate a unique UUID for the product
    const productuuid = uuidv4();

    // Construct the product object
    const productData = {
      category,
      productuuid,
      productName,
      brand,
      warranty,
      model,
      color,
      img,
      dynamicFields,
      weight,
      ingredients,
      expiryDate,
      size,
      material,
      ageGroup,
      pages,
      publisher,
      ISBN,
      skinType,
      applicationMethod,
    };

    // Remove null or undefined fields from the product object
    Object.keys(productData).forEach((key) => {
      if (productData[key] == null) delete productData[key];
    });

    // Create a new Product instance
    const product = new Product(productData);

    // Save the product to the database
    const savedProduct = await product.save();

    // Add the product ID to the seller's productCatalog array
    seller.productCatalog.push(savedProduct._id);
    await seller.save();

    // Send a success response
    return res.status(201).json({
      message: "Product added successfully and linked to the seller",
      product: savedProduct,
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

// export const removeProduct = async (req, res) => {
//   try {
//     // Extract the product ID from the request parameters
//     const { id, sid } = req.body;

//     // Validate that the ID is provided
//     if (!id) {
//       return res.status(400).json({
//         message: 'Product ID is required',
//       });
//     }

//     // Attempt to find and delete the product by ID
//     const deletedProduct = await Product.findByIdAndDelete(id);

//     // If no product is found, return a 404 error
//     if (!deletedProduct) {
//       return res.status(404).json({
//         message: 'Product not found',
//       });
//     }

//     // Send a success response
//     return res.status(200).json({
//       message: 'Product removed successfully',
//       deletedProduct,
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


export const removeProduct = async (req, res) => {
  try {
    // Extract the product ID and seller ID from the request body
    const { id, sid } = req.body;

    // Validate that the product ID and seller ID are provided
    if (!id || !sid) {
      return res.status(400).json({
        message: "Product ID and Seller ID are required",
      });
    }

    // Attempt to find and delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    // If no product is found, return a 404 error
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Find the seller and remove the product ID from the productCatalog array
    const seller = await Seller.findById(sid);

    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    // Remove the product ID from the productCatalog array
    seller.productCatalog = seller.productCatalog.filter(
      (productId) => productId.toString() !== id
    );

    // Save the updated seller document
    await seller.save();

    // Send a success response
    return res.status(200).json({
      message: "Product removed successfully and unlinked from the seller",
      deletedProduct,
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

export const updateProduct = async (req, res) => {
  try {
    // Extract the product ID from the request body
    const { id, ...updateData } = req.body;

    // Validate that the ID is provided
    if (!id) {
      return res.status(400).json({
        message: 'Product ID is required',
      });
    }

    // Validate that there are fields to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: 'No update data provided',
      });
    }

    // Use $set to update the specified fields of the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true } // Return the updated document
    );

    // If no product is found, return a 404 error
    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    // Send a success response
    return res.status(200).json({
      message: 'Product updated successfully',
      updatedProduct,
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

export const addProductsFromFile = async (req, res) => {
  try {
    const file = req.file; // Multer stores the file here
    const { sid } = req.body; // Get seller ID from the request body

    console.log(sid)

    // Validate if a file and seller ID are provided
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    if (!sid) {
      return res.status(400).json({ message: "Seller ID is required" });
    }

    const products = []; // Array to store products parsed from the file

    // Parse the file based on its MIME type
    if (file.mimetype === "text/csv") {
      // Parse CSV
      await new Promise((resolve, reject) => {
        fs.createReadStream(file.path)
          .pipe(csvParser())
          .on("data", (row) => {
            products.push(row); // Add each row to the products array
          })
          .on("end", resolve)
          .on("error", reject);
      });
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel"
    ) {
      // Parse Excel
      const workbook = xlsx.readFile(file.path);
      const sheetName = workbook.SheetNames[0]; // Read the first sheet
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      products.push(...sheetData); // Add all rows to the products array
    } else {
      return res
        .status(400)
        .json({ message: "Invalid file format. Only CSV or Excel files are supported." });
    }

    // Validate and format each product before insertion
    const validProducts = [];
    const failedRows = [];

    products.forEach((product, index) => {
      const {
        category,
        productName,
        brand,
        warranty,
        model,
        color,
        img,
        price,
        availability,
        weight,
        ingredients,
        expiryDate,
        size,
        material,
        ageGroup,
        pages,
        publisher,
        ISBN,
        skinType,
        applicationMethod,
      } = product;

      // Ensure required fields are present
      if (category && productName) {
        const productData = {
          productuuid: uuidv4(), // Assign a unique uuid to each product
          category,
          productName,
        };

        // Dynamically add non-null fields
        if (brand) productData.brand = brand;
        if (warranty) productData.warranty = warranty;
        if (model) productData.model = model;
        if (color) productData.color = color;
        if (img) productData.img = img;
        if (price || availability) {
          productData.dynamicFields = {};
          if (price) productData.dynamicFields.price = parseFloat(price);
          if (availability) productData.dynamicFields.availability = parseInt(availability, 10);
        }
        if (weight) productData.weight = weight;
        if (ingredients) productData.ingredients = ingredients;
        if (expiryDate) productData.expiryDate = expiryDate;
        if (size) productData.size = size;
        if (material) productData.material = material;
        if (ageGroup) productData.ageGroup = ageGroup;
        if (pages) productData.pages = pages;
        if (publisher) productData.publisher = publisher;
        if (ISBN) productData.ISBN = ISBN;
        if (skinType) productData.skinType = skinType;
        if (applicationMethod) productData.applicationMethod = applicationMethod;

        // Push the dynamically created product object to the validProducts array
        validProducts.push(productData);
      } else {
        // Add to failed rows if required fields are missing
        failedRows.push({ row: index + 1, error: "Missing required fields (category or productName)" });
      }
    });

    // Insert valid products into the database
    const result = await Product.insertMany(validProducts);

    // Extract inserted product IDs
    const productIds = result.map((product) => product._id);

    // Find the seller and add the product IDs to their productCatalog
    const seller = await Seller.findById(sid);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.productCatalog.push(...productIds);
    await seller.save();

    // Clean up the uploaded file
    fs.unlinkSync(file.path);

    // Respond with success and failure details
    return res.status(200).json({
      message: "File processed successfully",
      successCount: result.length,
      failedCount: failedRows.length,
      failedRows,
      seller,
    });
  } catch (error) {
    console.error(error);

    // Clean up the uploaded file if something goes wrong
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};






export const getTemplateByCategory = async (req, res) => {
  try {
    const { sid, category } = req.body;

    let templates;

    if (category === "All") {
      // Return all documents if category is "All"
      templates = await Template.find({});
    } else {
      // Find the template for the specified category
      templates = await Template.findOne({ category });

      // If template doesn't exist for the category
      if (!templates) {
        return res.status(404).json({ message: 'Template not found for this category' });
      }
    }

    // Return the templates
    return res.status(200).json({
      message: category === "All" ? 'All templates retrieved successfully' : 'Template retrieved successfully',
      templates,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};


export const viewSProduct = async (req, res) => {
  try {
    const {
      sid,
      page = 1,
      limit = 10,
      recent = false,
      sortAtoZ = false,
      category,
      priceMin,
      priceMax,
      minAvailable,
      maxAvailable,
    } = req.body; // Default page = 1, limit = 10

    // Fetch the seller details
    const seller = await Seller.findById(sid);
    if (!seller) {
      return res.status(404).json({
        message: "Seller not found ...",
      });
    }

    // Get the productCatalog array (array of product IDs)
    const productIds = seller.productCatalog;

    // Calculate pagination offsets
    const skip = (page - 1) * limit;

    // Build the query with filters
    const query = { _id: { $in: productIds } };

    if (category && Array.isArray(category) && category.length > 0) {
      query.category = { $in: category };  // Use $in to filter by a list of categories
    }
    

    if (priceMin !== undefined || priceMax !== undefined) {
      query["dynamicFields.price"] = {};
      if (priceMin !== undefined) query["dynamicFields.price"].$gte = priceMin;
      if (priceMax !== undefined) query["dynamicFields.price"].$lte = priceMax;
    }

    if (minAvailable !== undefined || maxAvailable !== undefined) {
      query["dynamicFields.availability"] = {};
      if (minAvailable !== undefined) query["dynamicFields.availability"].$gte = minAvailable;
      if (maxAvailable !== undefined) query["dynamicFields.availability"].$lte = maxAvailable;
    }

    // Build sorting logic
    let sortOptions = {}; // Default is no sorting
    if (recent) {
      // Sort by creation date (most recent first)
      sortOptions = { createdAt: -1 };
    } 
    if (sortAtoZ) {
      // Sort alphabetically by product name (ascending order)
      sortOptions = { productName: 1 };
    }

    // Fetch products based on the product IDs with pagination and sorting
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Get the total count of products after filtering
    const totalProducts = await Product.countDocuments(query);

    return res.status(200).json({
      message: "Products fetched successfully",
      products,
      pagination: {
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export const sellerData = async(req,res)=>{
  try {
    const {
      sid
    } = req.body

    let seller = await Seller.findById(sid)
    if(!seller){
      return res.status(404).json(
        {message: "Seller not found"}
      )
    }

    const { password, ...sellerWithoutPassword } = seller.toObject();

    return res.status(200).json({
      message:"Seller data fetched sucsessfully...",
      seller:sellerWithoutPassword
    })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}


export const addTemplate = async (req, res) => {
  try {
      const { category, fields } = req.body;

      if (!category || !fields || !Array.isArray(fields)) {
          return res.status(400).json({
              message: "Invalid request. 'category' and 'fields' are required.",
          });
      }

      const newTemplate = new Template({ category, fields });
      await newTemplate.save();

      return res.status(201).json({
          message: "Template saved successfully!",
          template: newTemplate,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
      });
  }
};

