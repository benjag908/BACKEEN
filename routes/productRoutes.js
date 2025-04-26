const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middlewares/auth');
const { checkPermission } = require('../middlewares/permissions');

// Definir rutas con middleware de protección y permisos
router.get('/', protect, checkPermission('products', 'read'), getProducts);
router.get('/:id', protect, checkPermission('products', 'read'), getProduct);
router.post('/', protect, checkPermission('products', 'create'), createProduct);
router.put('/:id', protect, checkPermission('products', 'update'), updateProduct);
router.delete('/:id', protect, checkPermission('products', 'delete'), deleteProduct);

module.exports = router;