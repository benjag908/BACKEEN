//permissionRoutes.js
const express = require('express');
const router = express.Router();
const {
  createPermission,
  getPermissions,
  getPermission,
  updatePermission,
  deletePermission
} = require('../controllers/permissionController');
const { protect } = require('../middlewares/auth');
const { checkPermission } = require('../middlewares/permissions');

router.post('/', protect, checkPermission('permissions', 'create'), createPermission);
router.get('/', protect, checkPermission('permissions', 'read'), getPermissions);
router.get('/:id', protect, checkPermission('permissions', 'read'), getPermission);
router.put('/:id', protect, checkPermission('permissions', 'update'), updatePermission);
router.delete('/:id', protect, checkPermission('permissions', 'delete'), deletePermission);

module.exports = router;