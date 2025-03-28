
import express from 'express'
import { getFilteredProducts, searchProductByName, viewProduct } from '../controllers/buyer.js'

const router = express.Router()

router.post('/viewproduct', viewProduct)
router.get('/filteredproducts', getFilteredProducts)
router.post('/searchp', searchProductByName)

export default router