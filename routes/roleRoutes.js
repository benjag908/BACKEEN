// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole
} = require('../controllers/roleController');
const { protect } = require('../middlewares/auth');
const { checkPermission } = require('../middlewares/permissions');

router.get('/', protect, checkPermission('roles', 'read'), getRoles);
router.get('/:id', protect, checkPermission('roles', 'read'), getRole);
router.post('/', protect, checkPermission('roles', 'create'), createRole);
router.put('/:id', protect, checkPermission('roles', 'update'), updateRole);
router.delete('/:id', protect, checkPermission('roles', 'delete'), deleteRole);

module.exports = router;