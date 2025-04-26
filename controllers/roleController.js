const Role = require('../models/Role');
const Permission = require('../models/Permission');
const Module = require('../models/Module');

// @desc    Get all roles
// @route   GET /api/roles
// @access  Private (Admin only)
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate({
      path: 'permissions.module permissions.actions',
      select: 'name path action description'
    });

    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener roles',
      error: error.message
    });
  }
};

// @desc    Get single role
// @route   GET /api/roles/:id
// @access  Private (Admin only)
exports.getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate({
      path: 'permissions.module permissions.actions',
      select: 'name path action description'
    });

    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Rol no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener rol',
      error: error.message
    });
  }
};

// @desc    Create role
// @route   POST /api/roles
// @access  Private (Admin only)
exports.createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    // Check if role exists
    const roleExists = await Role.findOne({ name });
    if (roleExists) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un rol con ese nombre'
      });
    }

    // Create role
    const role = await Role.create({
      name,
      description,
      permissions
    });

    res.status(201).json({
      success: true,
      message: 'Rol creado exitosamente',
      data: role
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear rol',
      error: error.message
    });
  }
};

// @desc    Update role
// @route   PUT /api/roles/:id
// @access  Private (Admin only)
exports.updateRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Rol no encontrado'
      });
    }

    // Update fields
    if (name) role.name = name;
    if (description) role.description = description;
    if (permissions) role.permissions = permissions;

    const updatedRole = await role.save();

    res.status(200).json({
      success: true,
      message: 'Rol actualizado correctamente',
      data: updatedRole
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar rol',
      error: error.message
    });
  }
};

// @desc    Delete role
// @route   DELETE /api/roles/:id
// @access  Private (Admin only)
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Rol no encontrado'
      });
    }

    await role.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Rol eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar rol',
      error: error.message
    });
  }
};
