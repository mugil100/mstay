/**
 * middleware/roleMiddleware.js - Role-based access control middleware
 * Usage: router.get('/admin', protect, authorize('admin'), handler)
 */

/**
 * authorize - Restricts access to specified roles
 * @param {...string} roles - Allowed roles (e.g. 'admin', 'owner')
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role '${req.user?.role}' is not allowed to access this resource`,
            });
        }
        next();
    };
};

module.exports = { authorize };
