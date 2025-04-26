//Migration.js
const mongoose = require('mongoose');

const MigrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Migration', MigrationSchema);

// utils/migrationRunner.js
const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');
const Migration = require('../migrations/Migration');
const connectDB = require('../config/db');
require('dotenv').config();

const runMigrations = async () => {
  try {
    await connectDB();
    
    console.log('Verificando migraciones pendientes...');
    
    // Obtener todas las migraciones ya aplicadas
    const appliedMigrations = await Migration.find().select('name').sort('name');
    const appliedMigrationNames = appliedMigrations.map(m => m.name);
    
    // Leer directorio de migraciones
    const migrationsDir = path.join(__dirname, '../migrations');
    const migrationFiles = (await fs.readdir(migrationsDir))
      .filter(file => file.endsWith('.js') && file !== 'Migration.js')
      .sort();
    
    // Filtrar migraciones pendientes
    const pendingMigrations = migrationFiles.filter(
      file => !appliedMigrationNames.includes(file)
    );
    
    if (pendingMigrations.length === 0) {
      console.log('No hay migraciones pendientes.');
      process.exit(0);
    }
    
    console.log(`Encontradas ${pendingMigrations.length} migraciones pendientes.`);
    
    // Ejecutar migraciones pendientes en orden
    for (const migrationFile of pendingMigrations) {
      console.log(`Aplicando migración: ${migrationFile}`);
      
      const migration = require(path.join(migrationsDir, migrationFile));
      
      // Ejecutar la migración
      await migration.up();
      
      // Registrar la migración como aplicada
      await Migration.create({ name: migrationFile });
      
      console.log(`Migración ${migrationFile} aplicada correctamente.`);
    }
    
    console.log('Todas las migraciones han sido aplicadas.');
    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar migraciones:', error);
    process.exit(1);
  }
};

// Ejemplo de script de migración
// migrations/01_add_dashboard_module.js
module.exports = {
  async up() {
    const Module = require('../models/Module');
    const Role = require('../models/Role');
    const Permission = require('../models/Permission');
    
    try {
      // Crear nuevo módulo
      const dashboardModule = await Module.create({
        name: 'dashboard',
        description: 'Módulo de dashboard',
        path: '/dashboard'
      });
      
      // Obtener permisos existentes
      const createPermission = await Permission.findOne({ name: 'create' });
      const readPermission = await Permission.findOne({ name: 'read' });
      
      // Añadir permisos al rol admin
      const adminRole = await Role.findOne({ name: 'admin' });
      adminRole.permissions.push({
        module: dashboardModule._id,
        actions: [createPermission._id, readPermission._id]
      });
      
      await adminRole.save();
      
      console.log('Migración completada: Módulo dashboard añadido');
    } catch (error) {
      console.error('Error en migración:', error);
      throw error;
    }
  },
  
  async down() {
    // Código para revertir la migración si fuera necesario
    const Module = require('../models/Module');
    const Role = require('../models/Role');
    
    try {
      // Eliminar permisos del módulo en roles
      await Role.updateMany(
        {},
        { $pull: { permissions: { module: { $in: [
          (await Module.findOne({ name: 'dashboard' }))._id
        ] } } } }
      );
      
      // Eliminar el módulo
      await Module.deleteOne({ name: 'dashboard' });
      
      console.log('Migración revertida: Módulo dashboard eliminado');
    } catch (error) {
      console.error('Error al revertir migración:', error);
      throw error;
    }
  }
};