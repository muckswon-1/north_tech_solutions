module.exports = function checkRole(allowedRoles = []) {
    return (req,res,next) => {
        const userRole = req.user?.role;
        const userId = req.user?.id;

       

        if(!userRole || !allowedRoles.includes(userRole)){
           
            return res.status(403).json({ message: 'Forbidden: Insufficent role'})
        }

        if(allowedRoles.includes('user') && req.params.id && userRole !== 'admin'){
           
            if(userId !== req.params.id){
                return res.status(403).json({ message: 'Forbidden: Cannot access other user data'});
            }
        }

       next();
    }
}