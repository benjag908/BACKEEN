// routes/moduleRoutes.js
const express = require('express');
const router = express.Router();
const {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
  getPermissions
} = require('../controllers/moduleController');
const { protect } = require('../middlewares/auth');
const { checkPermission } = require('../middlewares/permissions');

router.get('/', protect, getModules);
router.get('/permissions', protect, getPermissions);
router.get('/:id', protect, getModule);
router.post('/', protect, checkPermission('modules', 'create'), createModule);
router.put('/:id', protect, checkPermission('modules', 'update'), updateModule);
router.delete('/:id', protect, checkPermission('modules', 'delete'), deleteModule);

module.exports = router;
