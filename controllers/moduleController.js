const Module = require('../models/Module');
const Permission = require('../models/Permission');

// @desc    Get all modules
// @route   GET /api/modules
// @access  Private
exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find();

    res.status(200).json({
      success: true,
      count: modules.length,
      data: modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener módulos',
      error: error.message
    });
  }
};

// @desc    Get single module
// @route   GET /api/modules/:id
// @access  Private
exports.getModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Módulo no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener módulo',
      error: error.message
    });
  }
};

// @desc    Create module
// @route   POST /api/modules
// @access  Private (Admin only)
exports.createModule = async (req, res) => {
  try {
    const { name, description, path } = req.body;

    // Check if module exists
    const moduleExists = await Module.findOne({ name });
    if (moduleExists) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un módulo con ese nombre'
      });
    }

    // Create module
    const module = await Module.create({
      name,
      description,
      path
    });

    res.status(201).json({
      success: true,
      message: 'Módulo creado exitosamente',
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear módulo',
      error: error.message
    });
  }
};

// @desc    Update module
// @route   PUT /api/modules/:id
// @access  Private (Admin only)
exports.updateModule = async (req, res) => {
  try {
    const { name, description, path } = req.body;

    const module = await Module.findById(req.params.id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Módulo no encontrado'
      });
    }

    // Update fields
    if (name) module.name = name;
    if (description) module.description = description;
    if (path) module.path = path;

    const updatedModule = await module.save();

    res.status(200).json({
      success: true,
      message: 'Módulo actualizado correctamente',
      data: updatedModule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar módulo',
      error: error.message
    });
  }
};

// @desc    Delete module
// @route   DELETE /api/modules/:id
// @access  Private (Admin only)
exports.deleteModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Módulo no encontrado'
      });
    }

    await module.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Módulo eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar módulo',
      error: error.message
    });
  }
};

// @desc    Get all permissions
// @route   GET /api/modules/permissions
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