
### **API TEST - BUYER**

# Before testing data in postman change its value inside

1. **View Product** - `POST`  
   **URL**: `https://gcrneuratechserver.vercel.app/buyer/viewproduct`  
   **Body (JSON)**:
   ```json
   {
     "id": "67790c6d10ef041401a0ec6e"
   }
   ```

2. **Filtered Products** - `GET`  
   **URL**: `https://gcrneuratechserver.vercel.app/buyer/filteredproducts?category=electronics&priceMin=100&priceMax=1000&minAvailable=0&maxAvailable=1000&page=1&limit=5&recent=false&sortAtoZ=false`  
   **Note**: You can modify the query params in Postman. This example filters by category `electronics` and price range from 100 to 1000.

3. **Search Product** - `POST`  
   **URL**: `https://gcrneuratechserver.vercel.app/buyer/searchp`  
   **Body (JSON)**:
   ```json
   {
     "productName": "Nike T-shirt"
   }
   ```

---

### **API TEST - SELLER**

1. **Seller Register** - `POST`  
   **URL**: `https://gcrneuratechserver.vercel.app/seller/register`  
   **Body (JSON)**:
   ```json
   {
     "businessName": "Atharva General Stores",
     "email": "atharva123@gmail.com",
     "password": "atharva@123",
     "contactNumber": "9029203835",
     "businessAddress": {
       "street": "Satara",
       "city": "Pune",
       "state": "Maharashtra",
       "zipCode": "411001",
       "country": "India",
       "phoneNumber": "9029203835"
     },
     "taxId": "483672910"
   }
   ```

2. **Seller Login** - `POST`  
   **URL**: `https://gcrneuratechserver.vercel.app/seller/login`  
   **Body (JSON)**:
   ```json
   {
     "email": "atharva123@gmail.com",
     "password": "atharva@123"
   }
   ```

3. **Add Product** - `POST`  
   **URL**: `https://gcrneuratechserver.vercel.app/seller/addproduct`  
   **Body (JSON)**:
   ```json
   {
     "category": "electronics",
     "productName": "Nike Running Shoes",
     "brand": "Nike",
     "warranty": "2 years",
     "model": "RS123",
     "color": "Red",
     "img": "url_to_image",
     "dynamicFields": {
       "price": 120,
       "availability": 100
     },
     "weight": "500g",
     "ingredients": "Synthetic fabric",
     "expiryDate": "2025-12-31",
     "size": "10",
     "material": "Leather",
     "ageGroup": "Adult",
     "pages": null,
     "publisher": null,
     "ISBN": null,
     "skinType": null,
     "applicationMethod": null,
     "sid": "67790b6a10ef041401a0ec6a"  // Seller ID
   }
   ```

4. **Get Template** - `POST`  
   **URL**: `https://gcrneuratechserver.vercel.app/seller/gettemplate`  
   **Body (JSON)**:
   ```json
   {
     "sid": "67790b6a10ef041401a0ec6a"  // Seller ID
   }
   ```

5. **Update Product** - `POST`  
   **URL**: `https://gcrneuratechserver.vercel.app/seller/updateproduct`  
   **Body (JSON)**:
   ```json
   {
     "id": "67790c6d10ef041401a0ec6e",  // Product ID to update
     "productName": "Nike Running Shoes V2",
     "brand": "Nike",
     "dynamicFields": {
       "price": 130,
       "availability": 50
     }
   }
   ```

6. **Remove Product** - `POST`  
   **URL**: `https://gcrneuratechserver.vercel.app/seller/removeproduct`  
   **Body (JSON)**:
   ```json
   {
     "id": "60d5ec89f0b8b60018d2c582",  // Product ID to remove
     "sid": "67790b6a10ef041401a0ec6a"  // Seller ID
   }
   ```

7. **Add Products from File** - `POST`  
   **URL**: `https://gcrneuratechserver.vercel.app/seller/addproductsfile`  
   **Form Data (key-value pairs)**:
   - **key**: `file` (Select your CSV or Excel file to upload from the file explorer)
   - **key**: `sid` (Seller ID, for example: `67790b6a10ef041401a0ec6a`)

---

### **How to Test in Postman:**

1. **For POST requests**:
   - Select `POST` method in Postman.
   - Use the appropriate URL for each API.
   - Add the request body as JSON (or form-data if required) in Postman.

2. **For GET requests**:
   - Select `GET` method in Postman.
   - Use the appropriate URL for each API.
   - Add query parameters (like `category`, `priceMin`, etc.) in the Params tab in Postman.

Let me know if you need more details or modifications!