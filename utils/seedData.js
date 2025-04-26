const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const Module = require('../models/Module');
const Product = require('../models/Product'); // Añadimos el modelo Product
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Seed data
const seedData = async () => {
  try {
    console.log('Limpiando base de datos...');
    await User.deleteMany();
    await Role.deleteMany();
    await Permission.deleteMany();
    await Module.deleteMany();
    await Product.deleteMany(); // Limpiamos también los productos

    console.log('Creando permisos básicos...');
    const createPermission = await Permission.create({
      name: 'create',
      description: 'Permiso para crear',
      action: 'create'
    });

    const readPermission = await Permission.create({
      name: 'read',
      description: 'Permiso para leer/ver',
      action: 'read'
    });

    const updatePermission = await Permission.create({
      name: 'update',
      description: 'Permiso para actualizar',
      action: 'update'
    });

    const deletePermission = await Permission.create({
      name: 'delete',
      description: 'Permiso para eliminar',
      action: 'delete'
    });

    console.log('Creando módulos básicos...');
    const usersModule = await Module.create({
      name: 'users',
      description: 'Módulo de usuarios',
      path: '/users'
    });

    const rolesModule = await Module.create({
      name: 'roles',
      description: 'Módulo de roles',
      path: '/roles'
    });

    const modulesModule = await Module.create({
      name: 'modules',
      description: 'Módulo de módulos',
      path: '/modules'
    });

    const permissionsModule = await Module.create({
      name: 'permissions',
      description: 'Módulo de permisos',
      path: '/permissions'
    });

    const productsModule = await Module.create({
      name: 'products',
      description: 'Módulo de productos',
      path: '/products'
    });

    console.log('Creando roles básicos...');
    const adminRole = await Role.create({
      name: 'admin',
      description: 'Administrador con acceso completo',
      permissions: [
        {
          module: usersModule._id,
          actions: [
            createPermission._id,
            readPermission._id,
            updatePermission._id,
            deletePermission._id
          ]
        },
        {
          module: rolesModule._id,
          actions: [
            createPermission._id,
            readPermission._id,
            updatePermission._id,
            deletePermission._id
          ]
        },
        {
          module: modulesModule._id,
          actions: [
            createPermission._id,
            readPermission._id,
            updatePermission._id,
            deletePermission._id
          ]
        },
        {
          module: permissionsModule._id,
          actions: [
            createPermission._id,
            readPermission._id,
            updatePermission._id,
            deletePermission._id
          ]
        },
        {
          module: productsModule._id,
          actions: [
            createPermission._id,
            readPermission._id,
            updatePermission._id,
            deletePermission._id
          ]
        }
      ]
    });

    const userRole = await Role.create({
      name: 'user',
      description: 'Usuario con acceso limitado',
      permissions: [
        {
          module: usersModule._id,
          actions: [readPermission._id]
        },
        {
          module: rolesModule._id,
          actions: [readPermission._id]
        },
        {
          module: modulesModule._id,
          actions: [readPermission._id]
        },
        {
          module: permissionsModule._id,
          actions: [readPermission._id]
        },
        {
          module: productsModule._id,
          actions: [readPermission._id] // Los usuarios normales solo pueden leer productos
        }
      ]
    });

    console.log('Creando usuarios básicos...');
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'password123',
      role: adminRole._id
    });

    const normalUser = await User.create({
      username: 'user',
      email: 'user@example.com',
      password: 'password123',
      role: userRole._id
    });

    console.log('Creando productos de ejemplo para el admin...');
    await Product.create({
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 29.99,
      user: adminUser._id,
    });

    await Product.create({
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 49.99,
      user: adminUser._id,
    });

    console.log('¡Datos inicializados correctamente!');
    process.exit();
  } catch (error) {
    console.error('Error al inicializar datos:', error);
    process.exit(1);
  }
};

// Run seed function
seedData();