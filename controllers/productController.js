const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Private
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id }); // Solo productos del usuario autenticado
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message,
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, user: req.user._id });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener producto',
      error: error.message,
    });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      user: req.user._id, // Asocia el producto al usuario autenticado
    });
    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear producto',
      error: error.message,
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.findOne({ _id: req.params.id, user: req.user._id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: 'Producto actualizado correctamente',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar producto',
      error: error.message,
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, user: req.user._id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Producto eliminado correctamente',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar producto',
      error: error.message,
    });
  }
};