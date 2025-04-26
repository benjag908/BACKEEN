// middlewares/permissions.js

exports.checkPermission = (moduleName, action) => {
    return async (req, res, next) => {
      try {
        const { role } = req.user;
        
        // Check if user has admin role
        if (role.name === 'admin') {
          return next();
        }
        
        // Find the specific module in user's permissions
        const modulePermission = role.permissions.find(
          p => p.module.name === moduleName
        );
        
        if (!modulePermission) {
          return res.status(403).json({
            success: false,
            message: `No tiene permisos para acceder al módulo ${moduleName}`
          });
        }
        
        // Check if user has the required action permission
        const hasPermission = modulePermission.actions.some(
          p => p.action === action
        );
        
        if (!hasPermission) {
          return res.status(403).json({
            success: false,
            message: `No tiene permisos para realizar esta acción en el módulo ${moduleName}`
          });
        }
        
        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Error verificando permisos',
          error: error.message
        });
      }
    };
  };