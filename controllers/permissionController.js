//permissionController.js

const Permission = require('../models/Permission');

// @desc    Create a new permission
// @route   POST /api/permissions
// @access  Private (Admin only)
exports.createPermission = async (req, res) => {
  try {
    const { name, description, action } = req.body;

    // Check if permission exists
    const permissionExists = await Permission.findOne({ name });
    if (permissionExists) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un permiso con ese nombre'
      });
    }

    // Create permission
    const permission = await Permission.create({
      name,
      description,
      action
    });

    res.status(201).json({
      success: true,
      message: 'Permiso creado exitosamente',
      data: permission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear permiso',
      error: error.message
    });
  }
};

// @desc    Get all permissions
// @route   GET /api/permissions
// @access  Private (Admin only)
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();

    res.status(200).json({
      success: true,
      count: permissions.length,
      data: permissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener permisos',
      error: error.message
    });
  }
};

// @desc    Get single permission
// @route   GET /api/permissions/:id
// @access  Private (Admin only)
exports.getPermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: 'Permiso no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: permission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener permiso',
      error: error.message
    });
  }
};

// @desc    Update permission
// @route   PUT /api/permissions/:id
// @access  Private (Admin only)
exports.updatePermission = async (req, res) => {
  try {
    const { name, description, action } = req.body;

    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: 'Permiso no encontrado'
      });
    }

    // Update fields
    if (name) permission.name = name;
    if (description) permission.description = description;
    if (action) permission.action = action;

    const updatedPermission = await permission.save();

    res.status(200).json({
      success: true,
      message: 'Permiso actualizado correctamente',
      data: updatedPermission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar permiso',
      error: error.message
    });
  }
};

// @desc    Delete permission
// @route   DELETE /api/permissions/:id
// @access  Private (Admin only)
exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: 'Permiso no encontrado'
      });
    }

    await permission.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Permiso eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar permiso',
      error: error.message
    });
  }
};