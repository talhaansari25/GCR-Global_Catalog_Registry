import express from 'express';
import { 
  addProduct, 
  addProductsFromFile, 
  getTemplateByCategory, 
  loginSeller, 
  registerSeller, 
  viewSProduct, 
  removeProduct, 
  updateProduct, 
  sellerData,
  addTemplate
} from '../controllers/seller.js';
import multer from 'multer';

// Store uploaded files in the writable /tmp directory
const upload = multer({ dest: '/tmp' });

const router = express.Router();

router.post('/addtemplate', addTemplate )
router.post('/sellerinfo', sellerData);
router.post('/viewsproducts', viewSProduct);
router.post('/register', registerSeller);
router.post('/login', loginSeller);
router.post('/addproduct', addProduct);
router.post('/gettemplate', getTemplateByCategory);
router.post('/updateproduct', updateProduct);
router.post('/removeproduct', removeProduct);
router.post('/addproductsfile', upload.single('file'), addProductsFromFile);

export default router;
