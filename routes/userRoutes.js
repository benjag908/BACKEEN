// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const { checkPermission } = require('../middlewares/permissions');

router.get('/', protect, checkPermission('users', 'read'), getUsers);
router.get('/:id', protect, checkPermission('users', 'read'), getUser);
router.put('/:id', protect, checkPermission('users', 'update'), updateUser);
router.delete('/:id', protect, checkPermission('users', 'delete'), deleteUser);

module.exports = router;