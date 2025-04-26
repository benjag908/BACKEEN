// models/Role.js

const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  permissions: [{
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true
    },
    actions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission'
    }],
    // Permisos específicos a nivel de recurso (opcional)
    resourceRestrictions: {
      // Ejemplo: un rol puede tener acceso solo a ciertos recursos dentro de un módulo
      // Por ejemplo, un editor que solo puede editar sus propios artículos
      ownedOnly: {
        type: Boolean,
        default: false
      },
      // Otros tipos de restricciones podrían añadirse aquí
      specificIds: [{
        type: mongoose.Schema.Types.ObjectId
      }]
    }
  }],
  // Nivel de acceso global (opcional)
  accessLevel: {
    type: Number,
    default: 1, // 1: básico, 2: intermedio, 3: avanzado, etc.
  },
  // Metadatos
  isSystem: {
    type: Boolean,
    default: false // true para roles del sistema que no se pueden modificar
  }
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);